export const defaultLogMessages = (hasFinished = false) => {
	console.clear();
	if (!hasFinished) {
		console.log('%cHey, stop cheating! 😠', 'background-color: #E22134; padding: 0.3rem 1.5rem; font-family: Roboto; font-size: 1.2em; line-height: 1.4em; color: white;');
	} else {
		console.log('%cWhat, are you going to check if the results are accurate? Go ahead 💁‍♂️', 'background-color: #E22134; padding: 0.3rem 1.5rem; font-family: Roboto; font-size: 1.2em; line-height: 1.4em; color: white;');
	}
	console.log('%cBtw, while you\'re here, did you know that you can add CSS to console.log()? 😄', 'background-color: #003366; padding: 0.3rem 1.5rem; font-family: Roboto; font-size: 1.2em; line-height: 1.4em; color: white;');
	console.log('%cI wrote about it here 👉 https://javascript.plainenglish.io/adding-css-to-console-log-dde2e167ee7a', 'background-color: #065535; padding: 0.3rem 1.5rem; font-family: Roboto; font-size: 1.2em; line-height: 1.4em; color: white;');
	console.log('%cAnd here 👉 https://javascript.plainenglish.io/a-prettier-console-log-786f46d0bc3c', 'background-color: #065535; padding: 0.3rem 1.5rem; font-family: Roboto; font-size: 1.2em; line-height: 1.4em; color: white;');
	console.log('%cIt barely works in FireFox though, someone please ask Mozilla to fix it; this is important 💅', 'padding: 0.3rem 1.5rem; font-family: Roboto; font-size: 1.2em; line-height: 1.4em; color: white; background: rgb(131,58,180); background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);');
	if (!hasFinished) {
		console.log('%cType answers to get all answers 👇', 'padding: 0.3rem 1.5rem; font-family: Roboto; font-size: 1.2em; line-height: 1.4em; font-style: italic; border: 2px solid black;');
	}
}