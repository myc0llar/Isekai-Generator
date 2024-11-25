function randomise(arr){
    return arr[~~(Math.random() * arr.length)]
}

/**
 * Set the text of an HTML element by ID
 * Use innerHTML when you want to set or retrieve the HTML content of an element, including any tags and formatting.
 * Use textContent when you want to set or retrieve the plain text content of an element, without any HTML tags or formatting.
 * @param {string} id The HTML id of the element.
 * @param {string} text The new text of that element
 * @param {string} innerHTML If you're editing the innerHTML. This is false by default.
 * @returns 
 */
function setElement(id, text, innerHTML = false){
    if (innerHTML){
        // Update the innerHTML, not the textContent.
        return document.getElementById(id).innerHTML = text;
    } else {
        return document.getElementById(id).textContent = text;
    }
}

/**
 * Turns an array into a grammatically correct string.
 * @param {array} arr Array list (no object values).
 * @returns {string} 
 */
function listify(arr){
    if (arr.length== 0) return "";
    if (arr.length == 1){
        return arr[0]
    } else if (arr.length == 2){
        return arr.join(" and ");
    } else {
        let lastItem = arr[arr.length - 1];
        arr.pop();
        return `${arr.join(", ")} and ${lastItem}`;
    }
}
console.log('Arithmatic and DOM functions loaded!');
