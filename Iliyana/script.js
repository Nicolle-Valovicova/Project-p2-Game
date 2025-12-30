let gerechten = [
    {
        naam: "Fruitbowl",
        level: 1,
        image: "img/fruitbowl.png",
        stappen: ["Kom met yoghurt", "Fruit snijden", "Fruit in de kom doen", "Toppings toevoegen", "Serveren"],
        goedeVolgorde: ["Kom met yoghurt", "Fruit snijden", "Fruit in de kom doen", "Toppings toevoegen", "Serveren"]
    },
    {
        naam: "Pizza Margherita",
        level: 1,
        image: "img/pizza.png",
        stappen: ["Deeg uitrollen", "Tomatensaus toevoegen", "Mozzarella erop", "Basilicum toevoegen", "Pizza bakken", "Serveren"],
        goedeVolgorde: ["Deeg uitrollen", "Tomatensaus toevoegen", "Mozzarella erop", "Basilicum toevoegen", "Pizza bakken", "Serveren"]
    },
    {
        naam: "Cheeseburger",
        level: 1,
        image: "img/cheeseburger.png",
        stappen: ["Onderkant van het broodje pakken", "Burger erop", "Kaas op de burger", "Sla + tomaat toevoegen", "Bovenkant van het broodje erop", "Serveren"],
        goedeVolgorde: ["Onderkant van het broodje pakken", "Burger erop", "Kaas op de burger", "Sla + tomaat toevoegen", "Bovenkant van het broodje erop", "Serveren"]
    },
    {
        naam: "Poke Bowl",
        level: 2,
        image: "img/pokebowl.png",
        stappen: ["Kom met rijst", "Protein toevoegen", "Groentes toevoegen", "Avocado toevoegen", "Saus toevoegen", "Serveren"],
        goedeVolgorde: ["Kom met rijst", "Protein toevoegen", "Groentes toevoegen", "Avocado toevoegen", "Saus toevoegen", "Serveren"]
    },
    {
        naam: "Spaghetti bolognese",
        level: 2,
        image: "img/spaghetti.png",
        stappen: ["Spaghetti op bord", "Tomatensaus toevoegen", "Saus over spaghetti", "Kaas toevoegen", "Serveren"],
        goedeVolgorde: ["Spaghetti op bord", "Tomatensaus toevoegen", "Saus over spaghetti", "Kaas toevoegen", "Serveren"]
    },
    {
        naam: "Burrito",
        level: 2,
        image: "img/burrito.png",
        stappen: ["Tortilla neerleggen", "Rijst toevoegen", "Vlees/bonen toevoegen", "Groentes toevoegen", "Kaas + saus toevoegen", "Burrito oprollen"],
        goedeVolgorde: ["Tortilla neerleggen", "Rijst toevoegen", "Vlees/bonen toevoegen", "Groentes toevoegen", "Kaas + saus toevoegen", "Burrito oprollen"]
    },
    {
        naam: "Sushi roll",
        level: 3,
        image: "img/sushi.png",
        stappen: ["Nori neerleggen", "Rijst op nori", "Vulling toevoegen", "Sushi oprollen", "Rol snijden", "Stukjes neerleggen", "Serveren"],
        goedeVolgorde: ["Nori neerleggen", "Rijst op nori", "Vulling toevoegen", "Sushi oprollen", "Rol snijden", "Stukjes neerleggen", "Serveren"]
    },
        {
        naam: "Ramen",
        level: 3,
        image: "img/ramen.png",
        stappen: ["Bouillon in kom", "Noedels toevoegen", "Groentes toevoegen", "Protein toevoegen", "Ei toevoegen", "Toppings toevoegen","Serveren"],
        goedeVolgorde: ["Bouillon in kom", "Noedels toevoegen", "Groentes toevoegen", "Protein toevoegen", "Ei toevoegen", "Toppings toevoegen","Serveren"]
    },
    {
        naam: "Lasagne",
        level: 3,
        image: "img/lasagne.png",
        stappen: ["Eerste laag saus + bladen", "Tweede laag saus + bladen", "Derde laag saus + bladen", "Bechamelsaus toevoegen", "Kaas toevoegen","In de oven", "Stuk snijden", "Serveren"],
        goedeVolgorde: ["Eerste laag saus + bladen", "Tweede laag saus + bladen", "Derde laag saus + bladen", "Bechamelsaus toevoegen", "Kaas toevoegen","In de oven", "Stuk snijden", "Serveren"]
    },
    {
        naam: "Paella",
        level: 3,
        image: "img/paella.png",
        stappen: ["Rijst in pan", "Bouillon toevoegen", "Kip/seafood toevoegen", "Groentes toevoegen", "Kruiden toevoegen", "Garnalen bovenop", "Citroen toevoegen", "Serveren"],
        goedeVolgorde: ["Rijst in pan", "Bouillon toevoegen", "Kip/seafood toevoegen", "Groentes toevoegen", "Kruiden toevoegen", "Garnalen bovenop", "Citroen toevoegen", "Serveren"]
    },
]

console.log(gerechten);

let currentLevel = 1;
let currentGerecht;
let currentStapIndex = 0;
let lives = 3;
let score = 0;


function Play() {
    selectGerecht();         
    showGerechtInHtml();     
    showStappen();             
    waitForPlayerToChooseVolgorde();  
}

function selectGerecht() {
    for (let index = 0; index < gerechten.length; index++) {
        if (gerechten[index].level === currentLevel) {
             currentGerecht = gerechten[index];
             return;
        }
    }
}

function showGerechtInHtml() {
const naamElement = document.querySelector("#meal-name");
const imgElement = document.querySelector("#meal-img");
naamElement.textContent = currentGerecht.naam;
imgElement.src = currentGerecht.image;
};

function showStappen () {
    const stappenContainer = document.querySelector("#buttons");
    stappenContainer.innerHTML = "";
    const stappen = currentGerecht.stappen; 
    stappen.sort(() => Math.random() - 0.5);
    // De variabele stap is de parameter van deze callback-functie. Dit betekent dat in elke ronde van de loop,
    //stap de waarde krijgt van het huidige element uit de stappen array.
    stappen.forEach(stap => {
        const stapElement = document.createElement("button");
        stapElement.innerHTML = stap;
        stapElement.classList.add("stap");
        stapElement.addEventListener("click", () => {
        console.log("Geklikt:", stap);
        gekozenVolgorde.push(stap);
    })
      stappenContainer.append(stapElement);
    });
}

const klaarBtn = document.querySelector("#checkVolgorde");

klaarBtn.addEventListener("click", () => {
    if (gekozenVolgorde.length === currentGerecht.stappen.length) {
        checkGekozenVolgorde();
    } else {
        alert("Maak eerst de volgorde af!");
    }
});

function waitForPlayerToChooseVolgorde() {
    gekozenVolgorde = [];
}

function checkGekozenVolgorde() {
    let isCorrect = true;

    for (let index = 0; index < gekozenVolgorde.length; index++) {
        if (gekozenVolgorde[index] !== currentGerecht.goedeVolgorde[index]) {
            isCorrect = false;
            break;
        }
    }

    if (isCorrect) {
        alert("Nice! Je hebt de volgorde goed!");
        score++;
    } else {
        alert("Jammer! Je hebt de volgorde fout.");
        lives--;
    }

    UpdateScoreOrLives();
    CheckLevelComplete();
}

function UpdateScoreOrLives() {
    document.querySelector("#score").innerText = score;
    document.querySelector("#lives").innerText = lives;
}

Play();