// // // your code goes here
// // const chatContainer = document.getElementById("chat-container");
// // const chatBox = document.getElementById("chat-box");
// // const userInput = document.getElementById("user-input");

// // // Function to Show/Hide Chatbot
// // function toggleChat() {
// //     if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
// //         chatContainer.style.display = "flex";
// //     } else {
// //         chatContainer.style.display = "none";
// //     }
// // }

// // // Predefined FAQ Responses
// // const faqResponses = {
// //     "hello": "Hi there! How can I assist you?",
// //     "what are your rental prices?": "Our rental prices start from ₹500 per day.",
// //     "do you offer discounts?": "Yes! We offer discounts for long-term rentals.",
// //     "what are your working hours?": "We are open from 9 AM to 9 PM every day.",
// //     "bye": "Goodbye! Have a great day!",
// //     "thank you": "You're welcome! 😊"
// // };

// // // Function to Send Message
// // function sendMessage() {
// //     const message = userInput.value.trim().toLowerCase();
// //     if (message === "") return;

// //     appendMessage("user", message);
// //     userInput.value = "";

// //     // Check for predefined response
// //     const botResponse = getBotResponse(message);
// //     setTimeout(() => appendMessage("bot", botResponse), 1000);
// // }

// // // Function to Append Message to Chat
// // function appendMessage(sender, text) {
// //     const messageDiv = document.createElement("div");
// //     messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
// //     messageDiv.innerText = text;
// //     chatBox.appendChild(messageDiv);
// //     chatBox.scrollTop = chatBox.scrollHeight;
// // }

// // // Function to Get Chatbot's Response
// // function getBotResponse(userMessage) {
// //     return faqResponses[userMessage] || "I'm sorry, I don't understand that. Try asking something else!";
// // }

// // // Allow Sending Message with Enter Key
// // function handleKeyPress(event) {
// //     if (event.key === "Enter") {
// //         sendMessage();
// //     }
// // }



// function toggleChat() {
//     const chatContainer = document.getElementById("chat-container");
//     chatContainer.classList.toggle("hidden");
// }

// function sendMessage() {
//     const input = document.getElementById("user-input");
//     const chatBox = document.getElementById("chat-box");
//     const message = input.value.trim();
    
//     if (message !== "") {
//         // User message
//         const userMessage = document.createElement("div");
//         userMessage.className = "bg-green-100 text-green-900 p-2 rounded-md mb-2 w-fit self-end ml-auto";
//         userMessage.textContent = message;
//         chatBox.appendChild(userMessage);

//         // Bot response
//         setTimeout(() => {
//             const botMessage = document.createElement("div");
//             botMessage.className = "bg-blue-100 text-blue-900 p-2 rounded-md mb-2 w-fit";
//             botMessage.textContent = getBotResponse(message);
//             chatBox.appendChild(botMessage);

//             chatBox.scrollTop = chatBox.scrollHeight;
//         }, 500);

//         input.value = "";
//         chatBox.scrollTop = chatBox.scrollHeight;
//     }
// }

// function handleKeyPress(event) {
//     if (event.key === "Enter") {
//         sendMessage();
//     }
// }

// function getBotResponse(userInput) {
//     // Simple responses for demonstration
//     const responses = {
      
//         "hello": "Hi there! How can I assist you?",
//     "hi": "Hello! How can I help you today?",
//     "hey": "Hey! Need any assistance?",
//     "good morning": "Good morning! How can I help you?",
//     "good evening": "Good evening! What can I do for you?",
//     "what is easyride": "EasyRide is a vehicle rental platform that connects owners with renters.",
//     "how does easyride work": "Vehicle owners list their vehicles, and renters can book them for short-term use.",
//     "what are your working hours": "We are open from 9 AM to 9 PM every day.",
//     "do I need an account to rent a vehicle": "Yes, you need to create an account to rent or list a vehicle.",
//     "how do I contact customer support": "You can reach us via email or phone. Visit our 'Contact Us' page for details.",
//     "where is easyride based": "EasyRide is an online platform accessible across multiple cities in India.",
    
//     "what are your rental prices": "Our rental prices start from ₹500 per day.",
//     "do you offer discounts": "Yes! We offer discounts for long-term rentals.",
//     "what is the minimum rental period": "The minimum rental period is 2 hours.",
//     "can I rent for just a few hours": "Yes, we offer hourly rentals with a minimum of 2 hours.",
//     "is fuel included in the rental price": "No, fuel charges are separate and are the renter's responsibility.",
//     "do you have an app": "Currently, EasyRide is a web-based platform. We will launch our app soon!",
//     "what documents do I need to rent a vehicle": "You need a valid driving license and ID proof (Aadhar, Passport, or PAN card).",
    
//     "what payment methods do you accept": "We accept Razorpay, Stripe, PayPal, UPI, and credit/debit cards.",
//     "can I pay in cash": "No, all payments must be made online through our secure payment gateway.",
//     "can I cancel my booking": "Yes, you can cancel your booking. Refunds depend on our cancellation policy.",
//     "is there a security deposit": "Yes, some vehicles may require a refundable security deposit.",
//     "how do I get my security deposit back": "Deposits are refunded within 3-5 business days after returning the vehicle in good condition.",
    
//     "what vehicles are available for rent": "We offer cars, bikes, and scooters for rent.",
//     "how do I find available vehicles near me": "Use our location-based feature to find vehicles nearby.",
//     "do you offer luxury or premium vehicles": "Yes, we have premium and luxury vehicles available for rent.",
//     "can I rent multiple vehicles at once": "Yes, you can book multiple vehicles based on availability.",
//     "do you offer driver services": "Currently, we only offer self-drive rentals.",
    
//     "how do I list my vehicle on easyride": "Go to 'Register Your Vehicle' and fill out the required details.",
//     "what documents do I need to list my vehicle": "You need to provide your vehicle registration, insurance, and ID proof.",
//     "how do I receive payments for rentals": "Payments are securely processed through EasyRide and credited to your account.",
//     "can I set my own rental price": "Yes, owners can set competitive pricing for their vehicles.",
//     "what if my vehicle is damaged during a rental": "Our policies include renter responsibility for damages. You may file a claim if needed.",
//     "is my vehicle insured when rented out": "We recommend owners ensure their vehicle is covered under commercial insurance for rentals.",
    
//     "how do I view my rental history": "You can check your rental history in the 'User Profile' section.",
//     "can I modify my booking dates": "You can modify bookings depending on availability and policy.",
//     "how do I report an issue with a renter or vehicle": "Use the 'Report Issue' option in your dashboard or contact support.",
//     "can my account be suspended": "Yes, accounts may be suspended for policy violations or fraudulent activities.",
//     "do you verify renters before approving a booking": "Yes, we verify all renters using their ID and driving license.",
    
//     "is there a late return fee": "Yes, late returns may incur additional charges.",
//     "what happens if the vehicle breaks down during the rental": "Contact the owner and EasyRide support immediately for assistance.",
//     "can I extend my rental duration": "Yes, you can extend the rental period through your dashboard, subject to availability.",
//     "do you provide roadside assistance": "Yes, we offer roadside assistance for emergencies.",
//     "do you offer rentals for businesses": "Yes, we provide corporate rental solutions. Contact us for details.",
    
//     "what is the penalty for violating terms": "Violating our terms may result in fines or account suspension.",
//     "do you offer insurance coverage for renters": "Insurance coverage varies. Check with the owner or EasyRide support for details.",
//     "how can I delete my EasyRide account": "You can request account deletion by contacting our support team.",
    
//     "bye": "Goodbye! Have a great day!",
//     "thank you": "You're welcome! 😊",
//     "thanks": "You're welcome! Let me know if you need more help!"
//     };

//     return responses[userInput.toLowerCase()] || "I'm not sure how to respond to that.";
// }
// // function toggleChat() {
// //     const chatContainer = document.getElementById("chat-container");
// //     chatContainer.classList.toggle("hidden");
// // }

// // function sendMessage() {
// //     const input = document.getElementById("user-input");
// //     const chatBox = document.getElementById("chat-box");
// //     const message = input.value.trim();
    
// //     if (message !== "") {
// //         // User message
// //         const userMessage = document.createElement("div");
// //         userMessage.className = "bg-green-100 text-green-900 p-2 rounded-md mb-2 w-fit self-end ml-auto";
// //         userMessage.textContent = message;
// //         chatBox.appendChild(userMessage);

// //         // Bot response
// //         setTimeout(() => {
// //             const botMessage = document.createElement("div");
// //             botMessage.className = "bg-blue-100 text-blue-900 p-2 rounded-md mb-2 w-fit";
// //             botMessage.textContent = getBotResponse(message);
// //             chatBox.appendChild(botMessage);

// //             chatBox.scrollTop = chatBox.scrollHeight;
// //         }, 500);

// //         input.value = "";
// //         chatBox.scrollTop = chatBox.scrollHeight;
// //     }
// // }

// // function handleKeyPress(event) {
// //     if (event.key === "Enter") {
// //         sendMessage();
// //     }
// // }

// // function getBotResponse(userInput) {
// //     // Simple responses for demonstration
// //     const responses = {
      
// //         "hello": "Hi there! How can I assist you?",
// //     "hi": "Hello! How can I help you today?",
// //     "hey": "Hey! Need any assistance?",
// //     "good morning": "Good morning! How can I help you?",
// //     "good evening": "Good evening! What can I do for you?",
// //     "what is easyride": "EasyRide is a vehicle rental platform that connects owners with renters.",
// //     "how does easyride work": "Vehicle owners list their vehicles, and renters can book them for short-term use.",
// //     "what are your working hours": "We are open from 9 AM to 9 PM every day.",
// //     "do I need an account to rent a vehicle": "Yes, you need to create an account to rent or list a vehicle.",
// //     "how do I contact customer support": "You can reach us via email or phone. Visit our 'Contact Us' page for details.",
// //     "where is easyride based": "EasyRide is an online platform accessible across multiple cities in India.",
    
// //     "what are your rental prices": "Our rental prices start from ₹500 per day.",
// //     "do you offer discounts": "Yes! We offer discounts for long-term rentals.",
// //     "what is the minimum rental period": "The minimum rental period is 2 hours.",
// //     "can I rent for just a few hours": "Yes, we offer hourly rentals with a minimum of 2 hours.",
// //     "is fuel included in the rental price": "No, fuel charges are separate and are the renter's responsibility.",
// //     "do you have an app": "Currently, EasyRide is a web-based platform. We will launch our app soon!",
// //     "what documents do I need to rent a vehicle": "You need a valid driving license and ID proof (Aadhar, Passport, or PAN card).",
    
// //     "what payment methods do you accept": "We accept Razorpay, Stripe, PayPal, UPI, and credit/debit cards.",
// //     "can I pay in cash": "No, all payments must be made online through our secure payment gateway.",
// //     "can I cancel my booking": "Yes, you can cancel your booking. Refunds depend on our cancellation policy.",
// //     "is there a security deposit": "Yes, some vehicles may require a refundable security deposit.",
// //     "how do I get my security deposit back": "Deposits are refunded within 3-5 business days after returning the vehicle in good condition.",
    
// //     "what vehicles are available for rent": "We offer cars, bikes, and scooters for rent.",
// //     "how do I find available vehicles near me": "Use our location-based feature to find vehicles nearby.",
// //     "do you offer luxury or premium vehicles": "Yes, we have premium and luxury vehicles available for rent.",
// //     "can I rent multiple vehicles at once": "Yes, you can book multiple vehicles based on availability.",
// //     "do you offer driver services": "Currently, we only offer self-drive rentals.",
    
// //     "how do I list my vehicle on easyride": "Go to 'Register Your Vehicle' and fill out the required details.",
// //     "what documents do I need to list my vehicle": "You need to provide your vehicle registration, insurance, and ID proof.",
// //     "how do I receive payments for rentals": "Payments are securely processed through EasyRide and credited to your account.",
// //     "can I set my own rental price": "Yes, owners can set competitive pricing for their vehicles.",
// //     "what if my vehicle is damaged during a rental": "Our policies include renter responsibility for damages. You may file a claim if needed.",
// //     "is my vehicle insured when rented out": "We recommend owners ensure their vehicle is covered under commercial insurance for rentals.",
    
// //     "how do I view my rental history": "You can check your rental history in the 'User Profile' section.",
// //     "can I modify my booking dates": "You can modify bookings depending on availability and policy.",
// //     "how do I report an issue with a renter or vehicle": "Use the 'Report Issue' option in your dashboard or contact support.",
// //     "can my account be suspended": "Yes, accounts may be suspended for policy violations or fraudulent activities.",
// //     "do you verify renters before approving a booking": "Yes, we verify all renters using their ID and driving license.",
    
// //     "is there a late return fee": "Yes, late returns may incur additional charges.",
// //     "what happens if the vehicle breaks down during the rental": "Contact the owner and EasyRide support immediately for assistance.",
// //     "can I extend my rental duration": "Yes, you can extend the rental period through your dashboard, subject to availability.",
// //     "do you provide roadside assistance": "Yes, we offer roadside assistance for emergencies.",
// //     "do you offer rentals for businesses": "Yes, we provide corporate rental solutions. Contact us for details.",
    
// //     "what is the penalty for violating terms": "Violating our terms may result in fines or account suspension.",
// //     "do you offer insurance coverage for renters": "Insurance coverage varies. Check with the owner or EasyRide support for details.",
// //     "how can I delete my EasyRide account": "You can request account deletion by contacting our support team.",
    
// //     "bye": "Goodbye! Have a great day!",
// //     "thank you": "You're welcome! 😊",
// //     "thanks": "You're welcome! Let me know if you need more help!"
// //     };

// //     return responses[userInput.toLowerCase()] || "I'm not sure how to respond to that.";
// // }
function toggleChat() {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.classList.toggle("hidden");
}

function sendMessage() {
    const input = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");
    const message = input.value.trim().toLowerCase();
    
    if (message !== "") {
        // User message
        const userMessage = document.createElement("div");
        userMessage.className = "bg-green-100 text-green-900 p-2 rounded-md mb-2 w-fit self-end ml-auto";
        userMessage.textContent = input.value;
        chatBox.appendChild(userMessage);

        // Bot response
        setTimeout(() => {
            const botMessage = document.createElement("div");
            botMessage.className = "bg-blue-100 text-blue-900 p-2 rounded-md mb-2 w-fit";
            botMessage.textContent = getBotResponse(message);
            chatBox.appendChild(botMessage);

            chatBox.scrollTop = chatBox.scrollHeight;
        }, 500);

        input.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function getBotResponse(userInput) {
    // Expanded list of responses
    const responses = {
      


        "hello": "Hi there! How can I assist you?",
        "hi": "Hello! How can I help you today?",
        "hey": "Hey! Need any assistance?",
        "hlo": "Hi! How can I assist you?",
        "gm": "Good morning! How can I help?",
        "gn": "Good night! See you soon!",

        // Platform information
        "what easyride": "EasyRide is a vehicle rental platform that connects owners with renters.",
        "how easyride work": "Vehicle owners list their vehicles, and renters can book them for short-term use.",
        "u have app": "Currently, EasyRide is a web-based platform. Our app is launching soon!",
        "where easyride": "EasyRide is an online platform accessible across multiple cities in India.",
        
        // Rental details
        "rent car?": "Yes, we offer cars for rent. Please check our listings.",
        "how rent bike": "To rent a bike, search for available options and proceed with the booking.",
        "minimum time rent": "The minimum rental period is 2 hours.",
        "fuel include?": "No, fuel charges are separate and are the renter's responsibility.",
        "extend time rent": "Yes, you can extend your rental duration from your dashboard, subject to availability.",
        "can rent multiple vehicle": "Yes, you can book multiple vehicles at once, based on availability.",
        
        // Pricing and discounts
        "how much car rent?": "Our rental prices start from N.A per day, depending on the vehicle.",
        "any discount?": "Yes! We offer discounts for long-term rentals.",
        "is there deposit?": "Yes, some vehicles may require a refundable security deposit.",
        "when i get deposit back": "Deposits are refunded within 3-5 business days after returning the vehicle in good condition.",
        
        // Payments & policies
        "pay method?": "We accept Razorpay, Stripe, PayPal, UPI, and credit/debit cards.",
        "can pay cash?": "No, all payments must be made online through our secure payment gateway.",
        "cancel booking?": "Yes, you can cancel your booking. Refunds depend on our cancellation policy.",
        "late return charge?": "Yes, late returns may incur additional charges.",
        
        // Vehicle listing (for owners)
        "how list my car": "Go to 'Register Your Vehicle' and fill out the required details.",
        "what doc need list vehicle": "You need to provide vehicle registration, insurance, and ID proof.",
        "how i get money?": "Payments are securely processed through EasyRide and credited to your account.",
        "can set my own price": "Yes, owners can set competitive pricing for their vehicles.",
        "if my car damage?": "Our policies hold renters responsible for damages. You may file a claim if needed.",
        
        // User accounts & support
        "contact support?": "You can reach us via email or phone. Visit our 'Contact Us' page for details.",
        "view my rental history": "Check your rental history in the 'User Profile' section.",
        "modify booking?": "You can modify bookings depending on availability and policy.",
        "account suspended?": "Yes, accounts may be suspended for policy violations or fraudulent activities.",
        "how verify renter?": "Yes, all renters are verified using their ID and driving license.",
        
        // Roadside assistance & emergencies
        "car break down?": "Contact the owner and EasyRide support immediately for assistance.",
        "roadside help?": "Yes, we offer roadside assistance for emergencies.",
        "business rental?": "Yes, we provide corporate rental solutions. Contact us for details.",
        
        // Miscellaneous
        "penalty for violate rule": "Violating our terms may result in fines or account suspension.",
        "insurance cover?": "Insurance coverage varies. Check with the owner or EasyRide support for details.",
        "delete my account": "You can request account deletion by contacting our support team.",
        
        // Farewells
        "bye": "Goodbye! Have a great day!",
        "thank": "You're welcome! 😊",
        "thx": "You're welcome! Let me know if you need more help!"
    };

    // Try exact match
    if (responses[userInput]) {
        return responses[userInput];
    }

    // Try fuzzy matching (checks if user input contains a keyword)
    const keywords = Object.keys(responses);
    for (let key of keywords) {
        if (userInput.includes(key)) {
            return responses[key];
        }
    }

    // Default response for unknown questions
    return "I'm not sure how to respond to that. Could you rephrase your question?";
}