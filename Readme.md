<details>
<summary>1️⃣ What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?</summary>

**Answer:**  
The method in the question is used to **collect DOM elements** from an HTML file to a JS file. The main difference between these methods is **what element they collect**.  

- **`getElementById()`** is used for collecting elements by their **ID**; it can just select **one element**.  
- **`getElementsByClassName()`** is used to collect elements by their **class name**; this method can select **all elements** of the same class name. A **special feature** of this method is that it can `update` when the DOM element changes.  
- Then comes the **`querySelector()`** method. This method is used for using **CSS selectors** for selecting elements.  
- The **`querySelectorAll()`** method is used to select **all elements** that have the same property. But it has a problem of **NOT UPDATING** when the DOM changes.

</details>

<details>
<summary>2️⃣ How do you create and insert a new element into the DOM?</summary>

**Answer:**  
For creating new elements in JS, we use `document.createElement()` method. And then we should **add properties to it**. Then to insert it in DOM, we have **6 methods**:

&nbsp;&nbsp;&nbsp;&nbsp;**i)** To add at start → `parentNode.prepend(newElement)`  

&nbsp;&nbsp;&nbsp;&nbsp;**ii)** To add before the parent element → `parentNode.before(newElement)`  

&nbsp;&nbsp;&nbsp;&nbsp;**iii)** To add after the parent element → `parentNode.after(newElement)`  

&nbsp;&nbsp;&nbsp;&nbsp;**iv)** To add before a specific child in parent → `parentNode.insertBefore(newElement)`  

&nbsp;&nbsp;&nbsp;&nbsp;**v)** To add at end → `parentNode.appendChlid(newElement)`  

&nbsp;&nbsp;&nbsp;&nbsp;**vi)** To add multiple element at the end → `parentNode.append(newElement1, newElement 2)`

</details>

<details>
<summary>3️⃣ What is Event Bubbling? And how does it work?</summary>

**Answer:**  
Event bubbling is like a **water bubble** that is coming upward from the bottom of the water. So when we add an event to a **child**, the event goes to the **parent element**, and even if it goes to the **grandparent element**, it does not stop there; it goes **upward in the DOM tree**. The event starts from the **target element** and goes up to all its ancestors until it reaches the **top of the DOM**.

</details>

<details>
<summary>4️⃣ What is Event Delegation in JavaScript? Why is it useful?</summary>

**Answer:**  
Event delegation is a **technique** that is used to check **which child is occurring the event** by adding the event to the **parent**.  

In a big DOM element, we can just use an **event listener** on the parent element, and then we can check which child is triggered by using `"event.target."`  

For this, it is **so useful in coding**. It **reduces multiple event checking**.

</details>

<details>
<summary>5️⃣ What is the difference between preventDefault() and stopPropagation() methods?</summary>

**Answer:**  
`preventDefault()` and `stopPropagation()` are **two different things** to stop different things.  

- **`preventDefault()`** is used to **stop browser default behavior**, like when we click a **link** and the browser navigates. So `preventDefault()` is used to **stop this behavior**, and also preventDefault() is used to **stop the user from using right click**.  

- **`stopPropagation()`** is used to **stop the event bubbling**. Clicking on an element makes the event go **upward to its parents** and go upward in the DOM tree. To stop **bubbling**, we use `stopPropagation()`.

</details>
