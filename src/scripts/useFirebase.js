window.firebaseConfig = {
  apiKey: "AIzaSyCkQDk-WuixIbfy6Jo2ov2YyaJCqaT68u4",
  authDomain: "astrazeneca-v1.firebaseapp.com",
  projectId: "astrazeneca-v1",
  storageBucket: "astrazeneca-v1.firebasestorage.app",
  messagingSenderId: "877335724875",
  appId: "1:877335724875:web:a40471cd5e082f2ba9dece",
  measurementId: "G-30E4TTNSQZ",
};

async function getDocumentsOrderedByField(collectionDB, fieldName) {
  try {
    const querySnapshot = await collectionDB.orderBy(fieldName, "desc").get();

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return [];
    }

    let results = [];
    querySnapshot.forEach((doc) => {
      results.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    return results;
  } catch (error) {
    console.error("Error retrieving documents: ", error);
    return [];
  }
}

function updateIfGreater(docRef, user, questions) {
  try {
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("update", docRef);
          docRef
            .update({
              ...user,
              ...questions,
            })
            .then(() => {
              console.log("Document successfully update!");
            })
            .catch((error) => {
              console.error("Error update: ", error);
            });
        } else {
          console.log("set", docRef);
          docRef
            .set({
              ...user,
              ...questions,
            })
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error set:", error);
      });
  } catch (error) {
    console.error("Erro ao adicionar ou atualizar documento: ", error);
  }
}

function listenToUpdates(collection, call) {
  let isInitialLoad = true;

  collection.onSnapshot(
    (snapshot) => {
      if (isInitialLoad) {
        // Ignorar o primeiro snapshot, que é o estado inicial da coleção
        isInitialLoad = false;
        return;
      }

      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New document: ", change.doc.data());
          call(change);
        }
        if (change.type === "modified") {
          console.log("Modified document: ", change.doc.data());
          call(change);
        }
      });
    },
    (err) => {
      console.log(`Encountered error: ${err}`);
    }
  );
}

function addOrUpdateDocument(docRef, data) {
  try {
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("update", docRef);
          docRef
            .update({
              name: data.name,
              email: data.email,
              empresa: data.empresa,
              informativo: data.informativo,
              uid: data.uid,
            })
            .then(() => {
              console.log("Document successfully update!");
            })
            .catch((error) => {
              console.error("Error update: ", error);
            });
        } else {
          console.log("set", docRef);
          docRef
            .set({
              name: data.name,
              email: data.email,
              empresa: data.empresa,
              informativo: data.informativo,
              uid: data.uid,
            })
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error set:", error);
      });
  } catch (error) {
    console.error("Erro ao adicionar ou atualizar documento: ", error);
  }
}

///Inicialização do Firebase
window.initFirebase = false;
$(document).ready(function () {
  if (!window.initFirebase) {
    const firebaseApp = firebase.initializeApp(window.firebaseConfig);
    window.db = firebaseApp.firestore();
    window.collectionDB = window.db.collection("usuarios");
    window.initFirebase = true;
    console.log("confirmado", window.collectionDB);
  }
});

/// Criação do formulario
bridge.handlerFormDB = function (data) {
  const docRef = window.collectionDB.doc(data.email);
  addOrUpdateDocument(docRef, data);
};

/// Criação da nota do game
bridge.handlerGameDB = function (user, questions) {
  const docRef = window.collectionDB.doc(user.email);
  updateIfGreater(docRef, user, questions);
};

/// Criação da Ranking
bridge.listRankingDB = function (call) {
  getDocumentsOrderedByField(window.collectionDB, "maior")
    .then((results) => {
      console.log("Documents ordered by field in descending order:");
      call(results);
    })
    .catch((error) => {
      console.error("Error in getDocumentsOrderedByField: ", error);
    });
};

/// Controle do formulário via realtime - para mobile
bridge.handlerSnapshotFormDB = function (call) {
  listenToUpdates(window.collectionDB, call);
};
