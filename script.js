document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Script carregado e DOM pronto!");
  
    const eventForm = document.getElementById("eventForm");
    const eventList = document.getElementById("eventList");
    const loginBtn = document.getElementById("loginBiometrico");
  
    // 🔹 Configuração do Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyAqg8rkAlWh1JAj_L5sWsg4oQoj0jn7OCk",
      authDomain: "webtrends-2dbcc.firebaseapp.com",
      projectId: "webtrends-2dbcc",
      storageBucket: "webtrends-2dbcc.appspot.com",
      messagingSenderId: "696484822859",
      appId: "1:696484822859:web:2b8cc486d0f039045a32ce",
    };
  
    // 🔹 Inicializa Firebase (evita inicialização duplicada)
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  
    const auth = firebase.auth();
    const db = firebase.firestore();
  
    console.log("🔥 Firebase inicializado!", auth, db);
  
    // ✅ Captura o resultado do redirecionamento após login
    auth.getRedirectResult()
      .then((result) => {
        if (result.user) {
          console.log("Usuário logado via redirect:", result.user);
          alert(`Bem-vindo, ${result.user.displayName}!`);
        }
      })
      .catch((error) => {
        console.error("Erro ao processar login:", error);
      });
  
    // ✅ Monitorar o estado de autenticação do usuário
    auth.onAuthStateChanged((user) => {
      if (user) {
        document.getElementById(
          "userInfo"
        ).innerHTML = `Logado como: ${user.displayName} <br> <img src="${user.photoURL}" width="50">`;
        document.getElementById("loginGoogle").style.display = "none";
        document.getElementById("logout").style.display = "block";
      } else {
        document.getElementById("userInfo").innerHTML = "";
        document.getElementById("loginGoogle").style.display = "block";
        document.getElementById("logout").style.display = "none";
      }
    });
  
    // ✅ Função de login com Google (redirecionamento)
    function loginComGoogle() {
      console.log("Tentando login...");
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithRedirect(provider);
    }
  
    function logout() {
      auth.signOut().then(() => {
        alert("Você saiu da conta.");
        console.log("Logout realizado com sucesso!");
      }).catch((error) => {
        console.error("Erro ao sair:", error);
      });
    }
  
    document.getElementById("loginGoogle")?.addEventListener("click", loginComGoogle);
    document.getElementById("logout")?.addEventListener("click", logout);
  
    // ✅ Função para carregar eventos do Firestore
    function loadEvents() {
      eventList.innerHTML = "";
      db.collection("events")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            createEventElement(doc.data(), doc.id);
          });
        })
        .catch((error) => console.error("Erro ao carregar eventos: ", error));
    }
  
    // ✅ Criar e exibir um evento na lista
    function createEventElement(event, id) {
      const li = document.createElement("li");
      li.classList.add("event-item");
      li.innerHTML = `
                <h3>${event.name}</h3>
                <p><strong>Data:</strong> ${event.date}</p>
                <p><strong>Hora:</strong> ${event.time}</p>
                <p><strong>Descrição:</strong> ${event.description}</p>
                <button class="edit-btn" onclick="editEvent('${id}')">Editar</button>
                <button class="delete-btn" onclick="deleteEvent('${id}')">Excluir</button>
            `;
      eventList.appendChild(li);
    }
  
    // ✅ Função para excluir evento
    window.deleteEvent = function (id) {
      if (confirm("Are you sure that you want to delete this event?")) {
        db.collection("events")
          .doc(id)
          .delete()
          .then(() => {
            console.log("Event deleted!");
            loadEvents();
          })
          .catch((error) => console.error("Erro ao excluir evento: ", error));
      }
    };
  
    // ✅ Função para editar evento
    window.editEvent = function (id) {
      db.collection("events")
        .doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const event = doc.data();
            document.getElementById("eventName").value = event.name;
            document.getElementById("eventDate").value = event.date;
            document.getElementById("eventTime").value = event.time;
            document.getElementById("eventDescription").value = event.description;
  
            eventForm.setAttribute("data-editing-id", id);
          } else {
            alert("Evento não encontrado!");
          }
        })
        .catch((error) => console.error("Erro ao buscar evento: ", error));
    };
  
    // ✅ Adicionar ou editar evento (evita múltiplos listeners)
    if (!eventForm.hasAttribute("listener")) {
      eventForm.setAttribute("listener", "true");
  
      eventForm.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const name = document.getElementById("eventName").value;
        const date = document.getElementById("eventDate").value;
        const time = document.getElementById("eventTime").value;
        const description = document.getElementById("eventDescription").value;
  
        if (!name || !date || !time) {
          alert("Por favor, preencha todos os campos");
          return;
        }
  
        const newEvent = { name, date, time, description };
        const editingId = eventForm.getAttribute("data-editing-id");
  
        if (editingId) {
          db.collection("events")
            .doc(editingId)
            .update(newEvent)
            .then(() => {
              console.log("Evento atualizado!");
              loadEvents();
              eventForm.reset();
              eventForm.removeAttribute("data-editing-id");
            })
            .catch((error) => console.error("Erro ao atualizar evento: ", error));
        } else {
          db.collection("events")
            .add(newEvent)
            .then(() => {
              console.log("Evento criado!");
              loadEvents();
              eventForm.reset();
            })
            .catch((error) => console.error("Erro ao salvar evento: ", error));
        }
      });
    }
  
    // Carrega os eventos ao iniciar a página
    loadEvents();
  });
      