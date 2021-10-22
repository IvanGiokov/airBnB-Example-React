export default (scriptUrl) => {
    return new Promise((resolve, reject) => {
        //creating a script tag using the DOM functionalities in jas way
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptUrl;

        //this code ensures that the script tag will be loaded prior the finish of the await
        script.onload = () =>{
            resolve()
        }
        const headEl = document.getElementsByTagName('head')[0]
        headEl.appendChild(script)

        //this realtes to:
        // <script type='text/javascript' src='https://js.stripe.com/v3'></script>
        // an putting this tag into the head tag of our application
    
    })
}