//////// CREATE CHARACTER CLASS //////////////////////
//////////////////////////////////////////////////////
class Character {
    constructor (name, hitpoints, koolaids, specials, damage, accuracy, attackName) {
        this.name = name;
        this.hitpoints = hitpoints;
        this.koolaids = koolaids;
        this.specials = specials;
        this.damage = damage;
        this.attackName = attackName;
        this.accuracy = accuracy;
    }

    //////// HOW PLAYERS HEAL/////////////////////////////
    //////////////////////////////////////////////////////
    gainHitpoints() {
        this.hitpoints += 10;
        if (this.hitpoints > 100) {
            this.hitpoints = 100;
        }
        this.koolaids--;
        $newStatus = $(`<li>${this.name} drinks some Kool-Aid (no sugar) and gains 10 hitpoints!</li>`).css('color', 'hotpink');
        if (this.name == 'Craig') {
            $('#craig-hitpoints').text(craig.hitpoints);
            $('#craig-koolaids').text(craig.koolaids);

            $('.digital-output li').last().remove();
            $('.digital-output').prepend($newStatus);

            $('#boss-image').toggleClass('shake-picture');
            $('#craig-image').toggleClass('shake-picture image-border');
            $('#smokey-image').toggleClass('image-border');

            if (this.hitpoints > 25) {
                $('#craig-hitpoints').css('color', 'green')
            }

            isEnemyDead();

        } else {
            $('#smokey-hitpoints').text(smokey.hitpoints);
            $('#smokey-koolaids').text(smokey.koolaids);

            $('.digital-output li').last().remove();
            $('.digital-output').prepend($newStatus);

            $('#craig-image').toggleClass('shake-picture');
            $('#smokey-image').toggleClass('shake-picture image-border');
            $('#boss-image').toggleClass('image-border');

            if (this.hitpoints > 25) {
                $('#smokey-hitpoints').css('color', 'green')
            }

            isEnemyDead();
        }
    }
}

//////// CREATE CRAIG EXTENDS CLASS /////////////////////
/////////////////////////////////////////////////////////
class Craig extends Character {

    //////// CRAIG'S MAIN ATTACK /////////////////////////////
    //////////////////////////////////////////////////////////
    attackWithFists(enemy) {
        // console.log(`craig accuracy ${this.accuracy}`)
        if (Math.random() <= this.accuracy) {
            enemy.hitpoints -= 5;
            $newStatus = $(`<li>${this.name} ${this.attackName} ${currentEnemy.name} for ${this.damage} damage</li>`).css('color', 'green');
        } else {
            $newStatus = $(`<li>${this.name} whiffed and ${this.attackName} a trash can, missing ${currentEnemy.name} completely!</li>`).css('color', 'yellow');
        }
        $('.digital-output li').last().remove();
        $('.digital-output').prepend($newStatus);
        
        $('#boss-image').toggleClass('shake-picture');
        $('#craig-image').toggleClass('shake-picture image-border');
        $('#smokey-image').toggleClass('image-border');

        isEnemyDead();
    }

    //////// CRAIG'S SPECIAL ATTACK/////////////////////////////
    ////////////////////////////////////////////////////////////
    clownWithGun(enemy) {
        enemy.hitpoints -= 15;
        this.specials--;
        $newStatus = $(`<li>${this.name} flashes his piece at ${currentEnemy.name} for 15 damage</li>`).css('color', 'green');
        $('.digital-output li').last().remove();
        $('.digital-output').prepend($newStatus);
        
        $('#boss-image').toggleClass('shake-picture');
        $('#craig-image').toggleClass('shake-picture image-border');
        $('#smokey-image').toggleClass('image-border');
        
        $('#craig-specials').text(this.specials)

        isEnemyDead();
    }
}

//////// CREATE SMOKEY EXTENDS CLASS /////////////////////
//////////////////////////////////////////////////////////
class Smokey extends Character {

    //////// SMOKEY'S MAIN ATTACK/////////////////////////////
    //////////////////////////////////////////////////////////
    attackWithFists(enemy) {
        // let $newStatus = '';
        if (Math.random() <= this.accuracy) {
            enemy.hitpoints -= 5;
            $newStatus = $(`<li>${this.name} ${this.attackName} ${currentEnemy.name} for ${this.damage} damage</li>`).css('color', 'green');
        } else {
            $newStatus = $(`<li>${this.name} misses and ${this.attackName} a fence post, missing ${currentEnemy.name} completely!</li>`).css('color', 'yellow');
        }
        $('.digital-output li').last().remove();
        $('.digital-output').prepend($newStatus);

        $('#craig-image').toggleClass('shake-picture');
        $('#smokey-image').toggleClass('shake-picture image-border');
        $('#boss-image').toggleClass('image-border');

        isEnemyDead();
    }

    //////// SMOKEY'S SPECIAL ATTACK/////////////////////////////
    /////////////////////////////////////////////////////////////
    highPitchScream(enemy) {
        enemy.hitpoints -= 15;
        this.specials--;
        $newStatus = $(`<li>${this.name} screams loudly at ${currentEnemy.name} for 15 damage</li>`).css('color', 'green');

        $('.digital-output li').last().remove();
        $('.digital-output').prepend($newStatus);

        $('#craig-image').toggleClass('shake-picture');
        $('#smokey-image').toggleClass('shake-picture image-border');
        $('#boss-image').toggleClass('image-border');

        $('#smokey-specials').text(this.specials)

        isEnemyDead();
    }
}

//////// CREATE BOSS EXTENDS CLASS /////////////////////
////////////////////////////////////////////////////////
class Boss extends Character {
    constructor (name, hitpoints, koolaids, specials, damage, accuracy, attackName, level, flavorText, image) {
        super(name, hitpoints, koolaids, specials, damage, accuracy, attackName)
        this.level = level;
        this.flavorText = flavorText;
        this.image = image;
        }

    //////// THE BOSS'S ATTACK /////////////////////////////
    ////////////////////////////////////////////////////////
    attack(player) {
        // let $newStatus = '';
        // player = randomPlayer();

        if (Math.random() <= this.accuracy) {
            player.hitpoints -= this.damage;
            if (player.hitpoints <= 25) {
                if (player == craig) {
                    $('#craig-hitpoints').css('color', 'red')
                } else {
                    $('#smokey-hitpoints').css('color', 'red')
                }
            }
            $newStatus = $(`<li>${this.name} ${this.attackName} ${player.name} for ${this.damage} damage</li>`).css('color', 'red');
        } else {
            $newStatus = $(`<li>${this.name} falls flat on his face, missing ${player.name} completely!</li>`).css('color', 'orange');
        }
        $('.digital-output li').last().remove();
        $('.digital-output').prepend($newStatus);

        $('#smokey-image').toggleClass('shake-picture');
        $('#boss-image').toggleClass('shake-picture image-border');
        $('#craig-image').toggleClass('image-border');

        if (player == craig) {
            $('#craig-hitpoints').html(craig.hitpoints)
            if (craig.hitpoints <= 0) {
                playerLoses(craig, currentEnemy);
            }
        } else {
            $('#smokey-hitpoints').html(smokey.hitpoints)
            if (smokey.hitpoints <= 0) {
                playerLoses(smokey, currentEnemy);
            }
        }

    }
}

////////// DECLARE INITIAL VARIABLES ///////////////////////////////
////////////////////////////////////////////////////////////////////
const flavorText = [
    `Ezal's always trying to get that money. Defend your wallet and keep Ezal at bay.`,
    `Mr Parker chased Pastor Clever out of his house for the last time. Now he's throwing bricks around. Subdue Mr Parker to move about your day.`,
    `Hector got Smokey trapped in Deebo's chicken coop. Beat  Hector to regain your freedom`,
    `Big Worm sent his goons on a drive-by. Let him know when he'll get his money!`,
    `Deebo's terrorized the neighborhood one too many times. Show him the business end of your fists and win Debbie's love!`
] 
let craig, smokey, ezal, mrparker, hector, bigworm, deebo, currentEnemy, $newStatus = {};
let enemyList = [];
let turn = 'craig';

////////////////  INITIALIZE GAME STATS /////////////////////////
/////////////////////////////////////////////////////////////////
const initialize = () => {
    craig = new Craig('Craig', 100, 3, 2, 5, 0.85, 'knocks')
        $('#craig-hitpoints').text(craig.hitpoints)
        $('#craig-koolaids').text(craig.koolaids)
        $('#craig-specials').text(craig.specials)

    smokey = new Smokey('Smokey', 100, 3, 2, 5, 0.85, 'smacks')
        $('#smokey-hitpoints').text(smokey.hitpoints)
        $('#smokey-koolaids').text(smokey.koolaids)
        $('#smokey-specials').text(smokey.specials)
    ezal = new Boss ('Ezal', 20, 0, 0, 7, 0.65, 'hustles', 'LEVEL 1', flavorText[0],`images/ezal.png`)
    mrparker = new Boss ('Mr Parker', 25, 0, 0, 10, 0.75, 'throws a brick at', 'LEVEL 2', flavorText[1], `images/mrparker.png`)
    hector = new Boss ('Hector', 30, 0, 0, 12, 0.8, 'mocks', 'LEVEL 3', flavorText[2], `images/hector.jpg`)
    bigworm = new Boss ('Big Worm', 40, 0, 0, 15, 0.85, 'primps', 'LEVEL 4', flavorText[3], `images/bigworm.png`)
    deebo = new Boss ('Deebo', 50, 0, 0, 17, 0.9, 'pounds', 'FINAL BOSS', flavorText[4], `images/deebo.jpg`)

    enemyList = [ezal, mrparker, hector, bigworm, deebo];
    currentEnemy = enemyList[0];
        // let enemyList = [];
        // $newStatus = '';
    turn = 'craig';
        // $('#craig-image').toggleClass('image-border shake-picture')
        // currentEnemy = enemyList[4];

    $('#boss-image').attr('src',currentEnemy.image)
    $('#boss-info h2').html(`${currentEnemy.level} - ${currentEnemy.name}`);
    $('#boss-info p').html(currentEnemy.flavorText); 
    $('#boss-image').addClass('shake-picture');
    $('#craig-image').addClass('image-border');
    $('#smokey-hitpoints, #craig-hitpoints').css('color', 'green')
}

//////// INITIALIZE OR RESET GAME/////////////////////////////
//////////////////////////////////////////////////////////////
initialize();
    // currentEnemy = enemyList[4];    //START AT DEEBO
    // $('#boss-image').attr('src','images/ezal.png')

//////////// RANDOM PLAYER GENERATOR FOR ENEMY ATTACK ///////////////////////
/////////////////////////////////////////////////////////////////////////////
let randomPlayer = () => {
    if (Math.random() < 0.5) {
        // console.log(`attacks: ${craig.name}`)
        return craig;
    } else {
        // console.log(`attacks: ${smokey.name}`)
        return smokey;
    }
}

///////// RUN WHEN THE ENEMY ATTACKS /////////////////////////////////
//////////////////////////////////////////////////////////////////////
const enemyAttack = () => {
    turn = 'craig';
    currentEnemy.attack(randomPlayer());
}

////////// CHECK IF THE ENEMY IS DEAD //////////////////
////////////////////////////////////////////////////////
const isEnemyDead = () => {
    if (currentEnemy.hitpoints <= 0) {
        if (currentEnemy.name === enemyList[enemyList.length - 1].name) {
            playerWins();
        } else {
            currentEnemy = enemyList[enemyList.indexOf(currentEnemy) + 1]
            $('#boss-image').attr('src',currentEnemy.image)
            $('#boss-info h2').html(`${currentEnemy.level} - ${currentEnemy.name}`);
            $('#boss-info p').html(currentEnemy.flavorText);
        }
    }
}

///////// RUN WHEN THE PLAYER WINS /////////////////////
////////////////////////////////////////////////////////
const playerWins = () => {
    $('.digital-output').empty();
    $newStatus = $(`<li>You Win !</li>`).addClass('winner');
    $('.digital-output').prepend($newStatus);
        // $('.digital-output').append($youlose);

    $('#boss-image, #craig-image, #smokey-image').removeClass();

    $('#youwin').show();
    $('.play-again-no').on('click', function () {
        $('.digital-output').empty();
        for (let i = 0; i < 6; i++) {
            $('.digital-output').append($('<li></li>'));
            // $('.digital-output li').css('font-size', '18px')
        }
        $('#youwin').hide();
        initialize();
    });
    $('.play-again-yes').on('click', function () {
        $('.digital-output').empty();
        for (let i = 0; i < 6; i++) {
            $('.digital-output').append($('<li></li>'));
            // $('.digital-output li').css('font-size', '18px')
        }
        $('#youwin').hide();
        initialize();
    });
}

///////// RUN WHEN THE PLAYER LOSES /////////////////////
/////////////////////////////////////////////////////////
const playerLoses = (player, enemy) => {

    $('.digital-output').empty();
    $newStatus = $(`<li>You Lose !</li>`).addClass('loser');
    $('.digital-output').prepend($newStatus);
        // $('.digital-output').append($youlose);

    $('#loser-text').html(`Unfortunately ${player.name} was beaten by ${enemy.name}. It's a good thing Friday only comes once a week...\n\nWould you like to play again?`);

    $('#boss-image, #craig-image, #smokey-image').removeClass();

    $('#youlose').show();
    $('.play-again-no').on('click', function () {
        $('.digital-output').empty();
        for (let i = 0; i < 6; i++) {
            $('.digital-output').append($('<li></li>'));
            // $('.digital-output li').css('font-size', '18px')
        }
        $('#youlose').hide();
        initialize();
    });
    $('.play-again-yes').on('click', function () {
        $('.digital-output').empty();
        for (let i = 0; i < 6; i++) {
            $('.digital-output').append($('<li></li>'));
            // $('.digital-output li').css('font-size', '18px')
        }
        $('#youlose').hide();
        initialize();
    });
}
//////// TESTING /////////////////////////////
//////////////////////////////////////////////
// let $newStatus = '';
// let turn = 'craig';
// let currentEnemy = enemyList[0];
// $('#boss-image').attr('src',currentEnemy.image)
// console.log(craig.specials)
// console.log(currentEnemy)
// console.log(enemyList.indexOf(currentEnemy))
// $('#boss-info h2').html(`${currentEnemy.level} - ${currentEnemy.name}`);
// $('#boss-info p').html(currentEnemy.flavorText); 
///////////////////////////////////////////////

/////////// CLICK EVENTS FOR PLAYERS ACTIONS ////////////////////////
/////////////////////////////////////////////////////////////////////
$('#craig-attack-1').on('click', (event) => {
    if (turn == 'craig') {
        turn = 'smokey';
            // console.log(`turn is craig`);
        craig.attackWithFists(currentEnemy);
            // alert('craig attack fist');
            // console.log(`boss hp = ${currentEnemy.hitpoints}`)
    }
})
$('#craig-attack-2').on('click', (event) => {
    if (turn == 'craig' && craig.specials > 0) {
        turn = 'smokey';
            // console.log(`turn is craig`);
        craig.clownWithGun(currentEnemy);
            // alert('craig attack fist');
            // console.log(`boss hp = ${currentEnemy.hitpoints}`)
    }
})
$('#craig-heal').on('click', (event) => {
    if (turn == 'craig' && craig.koolaids > 0 && craig.hitpoints < 100) {
        turn = 'smokey';
            // console.log(`turn is craig`);
        craig.gainHitpoints();
            // alert('craig attack fist');
            // console.log(`boss hp = ${currentEnemy.hitpoints}`)
    }
})
$('#smokey-attack-1').on('click', (event) => {
    if (turn == 'smokey') {
        turn = 'currentEnemy';
        smokey.attackWithFists(currentEnemy)
            // alert('smokey attack fist')
            // console.log(`boss hp = ${currentEnemy.hitpoints}`)
        
        if (currentEnemy.hitpoints > 0) {    
            setTimeout(function() { enemyAttack(); }, 1500);
        } else {
            playerWins();
        } 
    }
})
$('#smokey-attack-2').on('click', (event) => {
    if (turn == 'smokey' && smokey.specials > 0) {
        turn = 'currentEnemy';
            // console.log(`turn is craig`);
        smokey.highPitchScream(currentEnemy);
            // alert('craig attack fist');
            // console.log(`boss hp = ${currentEnemy.hitpoints}`)

        if (currentEnemy.hitpoints > 0) {    
            setTimeout(function() { enemyAttack(); }, 1500);
        } else {
            playerWins();
        }    
    }
})
$('#smokey-heal').on('click', (event) => {
    if (turn == 'smokey' && smokey.koolaids > 0 && smokey.hitpoints < 100) {
        turn = 'currentEnemy';
            // console.log(`turn is craig`);
        smokey.gainHitpoints();
            // alert('craig attack fist');
            // console.log(`boss hp = ${currentEnemy.hitpoints}`)
        setTimeout(function() { enemyAttack(); }, 1500);
    }
})

/////////// CLICK EVENTS FOR INSTRUCTIONS BOX ///////////////////
/////////////////////////////////////////////////////////////////
$('#how-to-play').on('click', function () {
    $('#instructions').show();
});

$('.modal-close').on('click', function () {
    $('#instructions').hide();
});