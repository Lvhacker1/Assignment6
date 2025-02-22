$(() => {
    const API_URL_RANDOM = "https://official-joke-api.appspot.com/jokes/";
    const API_URL_JOKE = "https://v2.jokeapi.dev/joke/";

    const catchJoke = async () => {
        try {
            let response = await fetch(`${API_URL_RANDOM}random`);
            let jokeData = await response.json();

            $('#joke-result').html(`<p> ${jokeData.setup}</p> <p> ${jokeData.punchline}</p>`).show();
            console.log('Random joke:', jokeData);
        } catch (error) {
            console.error('Error fetching random joke:', error)
            $('#joke-result').text('Failed to fetch random joke.').show();
        }
    };
    
    const getJokeType = async () => {
        let jokeType = $('#joke-input').val().trim().toLowerCase();
        console.log('Joketype:', jokeType);

        if (jokeType !== "programming" && jokeType !== "dark") {
            $('#joke-type_result').text('Invalid category. Type "programming" or "dark".').show();
            return;
        }
        try {
            let response = await fetch(`${API_URL_JOKE}${jokeType}?type=twopart`);
            let jokeData = await response.json();

            $('#joke-type_result').html(`<p> ${jokeData.setup}</p> <p> ${jokeData.delivery}</p>`).show();
            console.log('Joke type:', jokeData);
        } catch (error) {
            console.error('Error fetching joke by category:', error);
            $('#joke-type_result').text('Failed to fetch joke.').show();
        }
    };

    $('#random-joke').on('click', catchJoke)
    $('#get_joke-type').on('click', getJokeType)
})