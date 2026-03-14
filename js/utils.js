/**
 * Mostra un popup dinamico
 * @param {string} titolo - Il titolo (es. "Ops!")
 * @param {string} messaggio - Il corpo del testo
 * @param {Object} opzioni - Testi e funzioni per i pulsanti
 */
function mostraMessaggio(titolo, messaggio, opzioni) {
    const overlay = document.getElementById('vr-overlay');
    
    overlay.querySelector('h3').innerText = titolo;
    overlay.querySelector('p').innerText = messaggio;
    
    const btnNo = overlay.querySelector('.btn-no');
    btnNo.innerText = opzioni.textNo || "Annulla";
    btnNo.onclick = () => {
        if (opzioni.actionNo) opzioni.actionNo();
        else overlay.style.display = 'none';
    };

    const btnYes = overlay.querySelector('.btn-yes');
    btnYes.innerText = opzioni.textYes || "Conferma";
    btnYes.onclick = () => {
        opzioni.actionYes();
        overlay.style.display = 'none';
    };

    overlay.style.display = 'flex';
}

/**
 * 1. Prende tutti i parametri dall'URL e li restituisce come oggetto.
 * Esempio: ?map=arena&user=123 -> { map: "arena", user: "123" }
 */
const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    const vars = {};
    params.forEach((value, key) => {
        vars[key] = value;
    });
    return vars;
};

/**
 * 2. Recupera tutti i dati dal LocalStorage e li restituisce come oggetto.
 */
const getStorageData = () => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        data[key] = localStorage.getItem(key);
    }
    return data;
};

/**
 * 3. Salva, Rimuove o Pulisce lo Storage.
 * @param {string} action - 'save', 'delete' o 'clear'
 * @param {string} key - La chiave del dato
 * @param {string} value - Il valore da salvare
 */
const manageStorage = (action, key = null, value = null) => {
    switch (action) {
        case 'save':
            if (key && value) localStorage.setItem(key, value);
            break;
        case 'delete':
            if (key) localStorage.removeItem(key);
            break;
        case 'clear':
            localStorage.clear();
            break;
        default:
            console.warn("Azione storage non valida");
    }
};

 const log = (msg, color = "#00ff00") => {
    if(!getUrlParams().debug) return;

    const overlay = document.getElementById('debug-overlay');
    const content = document.getElementById('debug-content');
    overlay.style.display = 'block';
    const entry = document.createElement('div');
    entry.style.color = color;
    entry.innerHTML = `<strong>[${new Date().toLocaleTimeString()}]</strong> ${msg}`;
    content.insertBefore(entry, content.firstChild);
}

window.log = log;

window.addEventListener('load', () => {
    const params = getUrlParams();
    if (params.session) {
        // Creazione del contenitore
        const sessionBox = document.createElement('div');
        sessionBox.id = 'session-display-box';
        
        // Stile del box (Nero, 30% width, 20% height, in alto a destra)
        Object.assign(sessionBox.style, {
            position: 'fixed',
            top: '10px',
            right: '10px',
            width: '20%',
            height: '10%',
            backgroundColor: 'transparent',
            color: '#00FF00',
            zIndex: '9999',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            boxSizing: 'border-box',
            overflow: 'hidden'
        });

        // Contenuto testuale con font differenziato per 0 e O
        sessionBox.innerHTML = `
            <div style="font-size: 3rem; font-family: 'Consolas', Courier, monospace; font-weight: bold; word-break: break-all; text-align: center;">
             ID:${params.session}
            </div>
        `;

        document.body.appendChild(sessionBox);
    }
});