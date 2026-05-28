let game = {
    gold: 0,

    // Gold Miner (Tier 1)
    miners: 0,
    minerCost: 20,
    minerProd: 1, // 1 gold/sec per miner

    // Young Dragon (Tier 2)
    dragons: 0,
    dragonCost: 200,
    dragonProd: 10 // 10 gold/sec per dragon (or produces miners later!)
};

function clickGold() {
    game.gold += 1;
    updateDisplay();
}

function buyMiner() {
    if (game.gold >= game.minerCost) {
        game.gold -= game.minerCost;
        game.miners += 1;
        game.minerCost = Math.floor(20 * Math.pow(1.15, game.miners));
        updateDisplay();
    }
}

// Formula to buy as many miners as possible at once
function buyMaxMiners() {
    while (game.gold >= game.minerCost) {
        game.gold -= game.minerCost;
        game.miners += 1;
        game.minerCost = Math.floor(20 * Math.pow(1.15, game.miners));
    }
    updateDisplay();
}

function buyYoungDragon() {
    if (game.gold >= game.dragonCost) {
        game.gold -= game.dragonCost;
        game.dragons += 1;
        game.dragonCost = Math.floor(200 * Math.pow(1.25, game.dragons));
        updateDisplay();
    }
}

// Game Loop (Updates 10 times per second)
setInterval(function() {
    let totalCps = (game.miners * game.minerProd) + (game.dragons * game.dragonProd);
    game.gold += totalCps / 10;
    updateDisplay();
}, 100);

function updateDisplay() {
    let totalCps = (game.miners * game.minerProd) + (game.dragons * game.dragonProd);

    // Formatting matching image_d648b2.jpg
    document.getElementById("gold-counter").innerText = "You have " + Math.floor(game.gold) + " gold";
    document.getElementById("gold-stats").innerText = "[" + totalCps + "/s, 1/click]";
    document.getElementById("sidebar-gold").innerText = "💰 Gold: " + Math.floor(game.gold);

    // Buttons Updates
    let minerBtn = document.getElementById("miner-btn");
    minerBtn.innerHTML = "Hire a gold miner<br>Costs: " + game.minerCost + " gold";
    minerBtn.disabled = game.gold < game.minerCost;

    let maxBtn = document.getElementById("max-btn");
    maxBtn.disabled = game.gold < game.minerCost;

    let dragonBtn = document.getElementById("dragon-btn");
    dragonBtn.innerHTML = "Get a young dragon<br>Costs: " + game.dragonCost + " gold";
    dragonBtn.disabled = game.gold < game.dragonCost;
}

// Initial UI load
updateDisplay();
