function sendMessage(number, message) {
    const chatBox = document.querySelector(`[contenteditable="true"]`);
    if (!chatBox) {
        console.error("No se encontró la caja de chat. Asegúrate de estar en una conversación activa.");
        return;
    }

    // Seleccionar el chat del contacto
    const searchBox = document.querySelector('div[contenteditable="true"][data-tab="3"]');
    searchBox.textContent = number;
    const inputEvent = new InputEvent('input', {
        bubbles: true,
        cancelable: true,
    });
    searchBox.dispatchEvent(inputEvent);

    setTimeout(() => {
        const contact = document.querySelector(`span[title="${number}"]`);
        if (!contact) {
            console.error(`No se encontró el contacto con el número ${number}.`);
            return;
        }
        contact.click();

        setTimeout(() => {
            chatBox.textContent = message;
            const inputEvent = new InputEvent('input', {
                bubbles: true,
                cancelable: true,
            });
            chatBox.dispatchEvent(inputEvent);

            // Enviar el mensaje
            const sendButton = document.querySelector('/html/body/div[1]/div/div/div[2]/div[4]/div/footer/div[1]/div/span[2]/div/div[2]/div[2]/button');
            if (sendButton) {
                sendButton.click();
            } else {
                console.error("No se encontró el botón de enviar.");
            }
        }, 1000);
    }, 1000);
}

// Ejemplo de uso:
sendMessage("+528120276216", "¡Hola! Este es un mensaje de prueba.");
sendMessage("Me", "¡Hola! Este es un mensaje de prueba.");