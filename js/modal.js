let openBtn = document.querySelector('#open-modal')
let closeBtn = document.querySelector('#close-modal')
let submitBtn = document.querySelector('#submit-modal')
let overlay = document.querySelector('.overlay')
let modal = document.querySelector('.modal')
let lastFocusedElement

window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    openModal();
  }); 

openBtn.addEventListener("click", openModal)
closeBtn.addEventListener("click", closeModal)
submitBtn.addEventListener("click", closeModal)

function openModal(){
    // store the last active focused element globally 
    lastFocusedElement = document.activeElement;

    // add appropiate class and attribute for a visible element 
    overlay.classList.add('active')
    overlay.setAttribute("aria-hidden", "false")

    // Find all focusable children, save references to the first and last focusable elements 
    let focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
    let focusableElementsList = modal.querySelectorAll(focusableElementsString)
    focusableElementsList = Array.prototype.slice.call(focusableElementsList)
    let firstFocusableElement = focusableElementsList[0]
    let lastFocusableElement = focusableElementsList[focusableElementsList.length - 1]
    
    // set focus to first focusable element in modal 
    firstFocusableElement.focus()

    // keyboard trap the user
    modal.addEventListener('keydown', function(e){
        if (e.keyCode === 9) { // tab key pressed 

            if (e.shiftKey) {  // backward keyboard navigation
                if (document.activeElement === firstFocusableElement){
                    e.preventDefault()
                    lastFocusableElement.focus()
                }
            }else{ // forward keyboard navigation
                if (document.activeElement === lastFocusableElement){
                    e.preventDefault()
                    firstFocusableElement.focus()
                }
            }
        }
        if (e.keyCode === 27) { // escape key pressed
            closeModal()
        }
    })
}

function closeModal(){
    // remove appropiate class and attribute for a non-visible element 
    overlay.classList.remove('active')
    overlay.setAttribute("aria-hidden", "true") 

    // restore focus to the previously focused element before the modal was opened
    lastFocusedElement.focus()
}