        // PSEUDO CODE FOR GALLERY APP
        // This virtual gallery app will generate a random work of art (image, title, artist) and dislay on the page, based on user submitted choices
        
        // Create namespace
        const artApp = {};

        // Init Function
        artApp.init = () => {
            artApp.getBite();
        };

        // API key 
        artApp.key = 'E7N3bYtxjyQCb5Yk4JTxaLKgpiIQ0MwPlyTsY3vAoZIU0uVTJxBdFtstmgDsGTwM';

        // Empty to array to pass jsonData
        artApp.array = [];


        // Fetch and parse API data
        artApp.getBite = () => {
            const url = new URL('http://api.thewalters.org/v1/objects?');

            url.search = new URLSearchParams ({
                apikey: artApp.key,
                Classification: 'Painting & Drawing',
                pageSize: 200,
            });

            fetch(url)
            .then((results) => {
                if (results.ok === true) {
                    return results.json();
                }
            })
            .then((jsonData) => {

            artApp.array =jsonData.Items;
            })
            artApp.displayBite();
        }


        // Display for user
        artApp.displayBite = () => {

            // variables to capture HTML elements
            const getFirstImgBtn = document.getElementById('getFirstImg');
            const getNewImgBtn = document.getElementById('getNewImg');
            const imgContainer = document.querySelector('.imageContainer');
            const txtContainer = document.querySelector('.textContainer');

            // EventListener for user click on header button
            getFirstImgBtn.addEventListener('click', () => {
                // var to capture random image
                const theImg = artApp.getRandomImage();

                // append random image and corresponding alt text to page
                imgContainer.innerHTML = `
                    <img src=${theImg.PrimaryImage.Raw} alt="${theImg.Medium}">
                `;
                // append random image title and artist information to page 
                txtContainer.innerHTML = `
                    <h2>${theImg.Title}</h2>
                    <p>${theImg.Creator}</p>
                `;

             // Disable header button click after one click    
            }, { once: true });
            

            // EventListener for user click on main button to display new random image
            getNewImgBtn.addEventListener('click', () => {
                const theImg = artApp.getRandomImage();
                imgContainer.innerHTML = `
                    <img src=${theImg.PrimaryImage.Raw} alt="${theImg.Medium}">
                `;
                txtContainer.innerHTML = `
                    <h2>${theImg.Title}</h2>
                    <p>${theImg.Creator}</p>
                `;
            })
        }

    
        // Randomize results
        artApp.getRandomImage = () => {
            const index = Math.floor(Math.random() * artApp.array.length);
            return artApp.array[index];
        }

        artApp.init();