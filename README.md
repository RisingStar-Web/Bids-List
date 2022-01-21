Frontend Coding Challenge
You have 8 hours to complete as much of this task as possible. Quality is more important than completeness. It is fine to leave things aside provided you call them out in your project's README. The goal of this code sample is to help us identify what you consider production-ready code.

Build a component that fetches a list of Bids and renders their details in a list/table format.

There is a REST API providing a list of Bids for you to render:

https://nft-fe-hiring.vercel.app/api/bids

and here is the shape of the results:

type Bid = {
    id: string,
    price: string,        // wei
    createdAt: number,    // UTC timestamp
    expiration: number,   // UTC timestamp
    bidder: string,       // ethereum address
    nft: {
        contract: string, // ethereum address,
        id: number
    }
}

It should have the following features:

The component should fetch the bids, process the result, and render their info in a list. Bids should not be passed as props to this component.
The component should present expiration timestamps in the user's timezone. You may show them relative to the current time (e.g. "10 minutes ago" or "in 3 hours") or absolute time (e.g. "Wed, 29 Dec 2021 22:53:41 GMT").
The component should clearly differentiate expired Bids from active Bids.
You should be able to configure the sort order of the items in this component at the callsite / parent.
The aspects of your code we will assess include:
Component interface: Does the component have a clear and properly scoped interface?
Functionality: Does the code run? Is it clear how to test and verify the solution?
UI design: Does the component look presentable, does it have a clear hierarchy of information, and does it display the requisite information to the user so they can use this component effectively?
Correctness: Does the application do what was asked? If there is anything missing, does the README explain why it is missing?
Code quality: Is the code simple, easy to understand, and maintainable? Are there any code smells or other red flags? Is the coding style consistent with the language's guidelines? Is it consistent throughout the codebase?
Technical choices: choices of libraries, dev tools, project setup, architecture etc. seem appropriate for the chosen task?
Our stack is mostly TypeScript, and while we'd prefer you use it for this challenge (and doing so will enable you to use our tools and types), it's okay if you'd like to use ES6 or ES6+Flow; we won't count it against your submission.

We do, however, strongly prefer that you use:

React.js with functional components
A CSS or CSS-in-React framework (e.g. TailwindCSS, Chakra UI, styled components)
ES6/ES7 features (e.g. Async/Await rather then promises/callbacks, etc...)Frontend Coding Challenge
You have 8 hours to complete as much of this task as possible. Quality is more important than completeness. It is fine to leave things aside provided you call them out in your project's README. The goal of this code sample is to help us identify what you consider production-ready code.
