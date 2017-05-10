$(document).ready(function() {

    var user = [];
    var enemy = [];
    var graveyard = [];
    var attackCounter = 0;
    var criticalHit = false;
    var clickUser = false;
    var clickEnemy = false;

    var rebel = [{
            health: 100,
            attack: 15,
            luck: 10,
            class: "enemyCharacter",
            id: "#luke_skywalker",
            icon: "<div class='enemyCharacter' id='luke_skywalker'><img class='container' src='assets/images/luke.jpg'/></div>"
        },
        {
            health: 100,
            attack: 10,
            luck: 20,
            class: "enemyCharacter",
            id: "#obi_wan",
            icon: "<div class='enemyCharacter' id='obi_wan'><img class='container' src='assets/images/kenobi.jpg'/></div>"
        },
        {
            health: 100,
            attack: 5,
            luck: 30,
            class: "enemyCharacter",
            id: "#han_solo",
            icon: "<div class='enemyCharacter' id='han_solo'><img class='container' src='assets/images/solo.jpg'/></div>"
        }
    ];

    var empire = [{
            health: 100,
            attack: 30,
            luck: 20,
            class: "character",
            id: "#vader",
            icon: "<div class='character' id='vader'><img class='container' src='assets/images/vader.jpg'/></div>"
        },
        {
            health: 100,
            attack: 15,
            luck: 5,
            class: "character",
            id: "#bobaFett",
            icon: "<div class='character' id='bobaFett'><img class='container' src='assets/images/bobaFett.jpg'/></div>"
        },
        {
            health: 100,
            attack: 5,
            luck: 60,
            class: "character",
            id: "#jarjar",
            icon: "<div class='character' id='jarjar'><img class='container' src='assets/images/jarjar.jpg'/></div>"
        }
    ];
    //rebel army
    var luke = rebel[0];
    var obiWan = rebel[1];
    var hanSolo = rebel[2];
    //empire army
    var vader = empire[0];
    var bobaFett = empire[1];
    var jarjar = empire[2];


    var displayCharacter = function(type) {
        if (type === user) {
            $("#pick_your_character").append(vader.icon, bobaFett.icon, jarjar.icon);
            $("#choose_character").html("<h2>Choose Your Character<h2>")
        }
        if (type === enemy) {
            $("#pick_your_character").append(luke.icon, hanSolo.icon, obiWan.icon);
            $("#choose_character").html("<h2>Choose Your Enemy<h2>")

        }


    };

    var pickCharacter = function(character, clickType, army, type) {
        //when a character is clicked
        $(character.id).click(function() {
            //if a user or enemy has not been selected
            if (clickType === false) {
                //if the character is in the rebel or empire army
                if (army.indexOf(character) > -1) {
                    //add the character to the user array
                    type.push(character);

                }
                //if the character is in the user or enemy array
                if (type.indexOf(character) > -1) {
                    //if type of character is user
                    if (type === user) {
                        // move user under user health bar
                        $(character.id).animate({
                            height: '150px',
                            width: '150px',
                            right: '60px',
                            bottom: '175px'

                        });
                        console.log(type[0]);
                        displayCharacter(enemy);
                        pickCharacter(luke, clickEnemy, rebel, enemy);
                        pickCharacter(obiWan, clickEnemy, rebel, enemy);
                        pickCharacter(hanSolo, clickEnemy, rebel, enemy);
                        var c = document.getElementById("your_health");
                        var ctx = c.getContext("2d");

                        ctx.beginPath();
                        ctx.rect(0, 0,300, 30);
                        ctx.fillStyle = "green";
                        ctx.fill();

                        // if type of character is enemy
                    } else if (type === enemy) {
                        // move enemy under enemy health bar
                        $(character.id).animate({
                            height: '150px',
                            width: '150px',
                            left: '830px',
                            bottom: '200px'

                        });
                        console.log(type[0]);
                        fight();
                                var c = document.getElementById("enemy_health");
                                var ctx = c.getContext("2d");

                                ctx.beginPath();
                                ctx.rect(0, 0,300, 30);
                                ctx.fillStyle = "green";
                                ctx.fill()                        
                    }

                    //remove characters that were not picked
                    if (army === rebel) {
                        if (character === luke) {
                            $(hanSolo.id).remove();
                            $(obiWan.id).remove();
                        } else if (character === hanSolo) {
                            $(luke.id).remove();
                            $(obiWan.id).remove();
                        } else if (character === obiWan) {
                            $(hanSolo.id).remove();
                            $(luke.id).remove();
                        } else {
                            console.log("invalid choice");
                        };
                    };
                    if (army === empire) {
                        if (character === vader) {
                            $(bobaFett.id).remove();
                            $(jarjar.id).remove();
                        } else if (character === bobaFett) {
                            $(vader.id).remove();
                            $(jarjar.id).remove();
                        } else if (character === jarjar) {
                            $(vader.id).remove();
                            $(bobaFett.id).remove();
                        } else {
                            console.log("invalid choice");
                        };
                    }
                };
            }; //end of clickType === true
            //a user or enemy has been picked	
            clickType = true;

        });

    };

    displayCharacter(user)
    pickCharacter(vader, clickUser, empire, user);
    pickCharacter(bobaFett, clickUser, empire, user);
    pickCharacter(jarjar, clickUser, empire, user);

    var fight = function() {
        $("#choose_character").html("<div id='fight'><h5>FIGHT</h5></div>")
        $("#fight").click(function() {

            var random = Math.floor(Math.random() * 100);
            //if enemy is alive

            // user attack rules


            if (user[0].health > 0) {
                if (enemy[0].luck < random) {
                    if (random > 75) {
                        criticalHit = true;
                        alert("Critcal Hit!!");
                    }

                    if (criticalHit === true) {
                        attackCounter = attackCounter + 5
                        user[0].attack = user[0].attack + attackCounter + 30;

                                var c = document.getElementById("your_health");
                                var ctx = c.getContext("2d");

                                ctx.beginPath();
                                ctx.rect(0, 0, user[0].health * 3, 30);
                                ctx.fillStyle = "green";
                                ctx.fill();
                    } else {
                        attackCounter = attackCounter + 5;
                        user[0].attack = user[0].attack + attackCounter;

                                var c = document.getElementById("your_health");
                                var ctx = c.getContext("2d");

                                ctx.beginPath();
                                ctx.rect(0, 0, user[0].health * 3, 30);
                                ctx.fillStyle = "green";
                                ctx.fill();
                    };


                    enemy[0].health = enemy[0].health - user[0].attack;
                } else {
                    alert("the attack missed!");
                }
                if (enemy.health <= 0) {
                    console.log("the enemy has died!")
                };
            } else {
                alert("you lose!");
                window.location.href = "starwars.html";

            };
            if (enemy[0].health > 0) {
                if (user[0].luck < random) {
                    user[0].health = user[0].health - enemy[0].attack;
                    
                                var c = document.getElementById("your_health");
                                var ctx = c.getContext("2d");

                                ctx.beginPath();
                                ctx.rect(0, 0, user[0].health * 3, 30);
                                ctx.fillStyle = "green";
                                ctx.fill();
                } else {
                    alert("You dodged the enemy attack!");
                };
                console.log(user[0])
                console.log(enemy[0])
            } else {
                console.log("enemy has died")
                if (enemy[0] === luke) {
                    graveyard.push(luke)
                    $(luke.id).remove();
                    enemy.pop(luke);

                    console.log(graveyard.length)
                    if (graveyard.length === 1) {
                        $("#pick_your_character").append(hanSolo.icon, obiWan.icon);
                        pickCharacter(hanSolo, clickEnemy, rebel, enemy);
                        pickCharacter(obiWan, clickEnemy, rebel, enemy);
                        console.log(enemy);
                        console.log(user);
                    } else if (graveyard.length === 2) {
                        if (graveyard.indexOf(obiWan) < 0) {
                            $("#pick_your_character").append(obiWan.icon);
                            pickCharacter(obiWan, clickEnemy, rebel, enemy);
                        } else {
                            $("#pick_your_character").append(hanSolo.icon);
                            pickCharacter(hanSolo, clickEnemy, rebel, enemy);
                        }
                    } else if (graveyard.length === 3) {
                        alert("you win!");
                        window.location.href = "starwars.html";
                    } else {};

                } else if (enemy[0] === hanSolo) {
                    graveyard.push(hanSolo)
                    $(hanSolo.id).remove();
                    enemy.pop(hanSolo);

                    if (graveyard.length === 1) {
                        $("#pick_your_character").append(obiWan.icon, luke.icon);
                        pickCharacter(obiWan, clickEnemy, rebel, enemy);
                        pickCharacter(luke, clickEnemy, rebel, enemy);
                        console.log(enemy);
                        console.log(user);
                    } else if (graveyard.length === 2) {
                        if (graveyard.indexOf(obiWan) < 0) {
                            $("#pick_your_character").append(obiWan.icon);
                            pickCharacter(obiWan, clickEnemy, rebel, enemy);
                        } else {
                            $("#pick_your_character").append(luke.icon);
                            pickCharacter(luke, clickEnemy, rebel, enemy);
                        }
                    } else if (graveyard.length === 3) {
                        alert("you win!");
                        window.location.href = "starwars.html";
                    } else {};

                } else if (enemy[0] === obiWan) {
                    graveyard.push(obiWan)
                    $(obiWan.id).remove();
                    enemy.pop(obiWan);
                    if (graveyard.length === 1) {
                        $("#pick_your_character").append(luke.icon, hanSolo.icon);
                        pickCharacter(hanSolo, clickEnemy, rebel, enemy);
                        pickCharacter(luke, clickEnemy, rebel, enemy);
                        console.log(enemy);
                        console.log(user);
                    } else if (graveyard.length === 2) {
                        if (graveyard.indexOf(luke) < 0) {
                            $("#pick_your_character").append(luke.icon);
                            pickCharacter(luke, clickEnemy, rebel, enemy);;
                        } else {
                            $("#pick_your_character").append(hanSolo.icon);
                            pickCharacter(hanSolo, clickEnemy, rebel, enemy);
                        }
                    } else if (graveyard.length === 3) {
                        alert("you win!");
                        window.location.href = "starwars.html";
                    } else {};

                } else {
                    alert("you win!");
                    window.location.href = "starwars.html";
                }


            }



        });

    };




}); //end of script