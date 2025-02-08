class Message {
    constructor (message) {
        this.attributes = message["attributes"];
        this.messageContainer = document.createElement("div");
    }

    //check if it was received, sent, drafter or etc
    getMessageType() {
        let data = this.attributes["type"];
        if(data === undefined) { //mms contain type data in other field
            data = this.attributes["msg_box"];
        }

        switch(data["nodeValue"]) { //mms have only 1-4 type
            case "1":
                return "received";
                break;
            case "2":
                return "sent";
                break;
            case "3":
                return "draft";
                break;
            case "4":
                return "outbox";
                break;
            case "5":
                return "failed";
                break;
            case "6":
                return "queued";
                break;
        }
    }

    displayInfo() {

        const messageType = this.getMessageType();

        if (messageType === "sent") {
            this.messageContainer.className = "messageContainer";
        }
        else {
            this.messageContainer.className = "messageContainer2";
        }
       
        this.timestamp = this.attributes["date"];
        const address = this.attributes["address"];
        const contactName = this.attributes["contact_name"];
        this.address = address;

        // Create and add the timestamp first
        const readableDate = this.attributes["readable_date"];
        if (typeof readableDate !== 'undefined') {
            let dateDiv = document.createElement("div");
            dateDiv.className = "messageDate";
            dateDiv.innerHTML = readableDate["nodeValue"];
            this.messageContainer.appendChild(dateDiv); // Add at the top
        }

        // Display address
        let addressDiv = document.createElement("div");
        addressDiv.className = "address";
        addressDiv.innerHTML = address["nodeValue"];
        this.messageContainer.appendChild(addressDiv);

        

        // Display message type (sent, received, etc.)
        
        let messageTypeNode = document.createElement("div");
        messageTypeNode.className = "messageType";
        if (messageType === "sent") {
            // messageTypeNode.innerHTML = "You"; // For sent messages, display "you"
            let contactNameDiv = document.createElement("div");
            contactNameDiv.className = "contactName";
            contactNameDiv.innerHTML = "You"
            this.messageContainer.appendChild(contactNameDiv);
        } else {
            // Display contact name if available
            if (contactName !== undefined && contactName["nodeValue"] !== '(Unknown)') {
                let contactNameDiv = document.createElement("div");
                contactNameDiv.className = "contactName";
                contactNameDiv.innerHTML = contactName["nodeValue"];
                this.messageContainer.appendChild(contactNameDiv);
            }
        }

        //messageTypeNode.innerHTML = messageType;
        this.messageContainer.className += (' ' + messageType);
        this.messageContainer.appendChild(messageTypeNode);
    }


    getMessage() {
        this.displayInfo();
        //document.getElementById("container").appendChild(this.messageContainer);
        return [this.address, this.timestamp, this.messageContainer];
    }
}