$(document).ready(function() {
			//global variables
            var user = [];
            var enemy = [];
            var graveyard = [];
            var attackCounter = 0;
            var criticalHit = false;
            var clickUser = false;
            var clickEnemy = false;
            //rebel character objects
            var rebel = [{
                    health: 100,
                    attack: 15,
                    luck: 10,
                    class: "character",
                    id: "#luke_skywalker",
                    icon: "<div class='character' id='luke_skywalker'><img class='container' src='assets/images/luke.jpg'/></div>"
                },
                {
                    health: 100,
                    attack: 10,
                    luck: 20,
                    class: "character",
                    id: "#obi_wan",
                    icon: "<div class='character' id='obi_wan'><img class='container' src='assets/images/kenobi.jpg'/></div>"
                },
                {
                    health: 100,
                    attack: 5,
                    luck: 30,
                    class: "character",
                    id: "#han_solo",
                    icon: "<div class='character' id='han_solo'><img class='container' src='assets/images/solo.jpg'/></div>"
                }
            ];
            //empire character objects
            var empire = [{
                    health: 100,
                    attack: 30,
                    luck: 20,
                    class: "enemyCharacter",
                    id: "#vader",
                    icon: "<div class='enemyCharacter' id='vader'><img class='container' src='assets/images/vader.jpg'/></div>"
                },
                {
                    health: 100,
                    attack: 15,
                    luck: 5,
                    class: "enemyCharacter",
                    id: "#bobaFett",
                    icon: "<div class='enemyCharacter' id='bobaFett'><img class='container' src='assets/images/bobaFett.jpg'/></div>"
                },
                {
                    health: 100,
                    attack: 5,
                    luck: 60,
                    class: "enemyCharacter",
                    id: "#jarjar",
                    icon: "<div class='enemyCharacter' id='jarjar'><img class='container' src='assets/images/jarjar.jpg'/></div>"
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
                    $("#pick_your_character").append(luke.icon, hanSolo.icon, obiWan.icon);
                    $("#choose_character").html("<h2>Choose Your Character<h2>")
                }
                if (type === enemy) {
                    $("#pick_your_character").append(vader.icon, bobaFett.icon, jarjar.icon);
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
                                displayCharacter(enemy);
                                pickCharacter(vader, clickEnemy, empire, enemy);
                                pickCharacter(bobaFett, clickEnemy, empire, enemy);
                                pickCharacter(jarjar, clickEnemy, empire, enemy);
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
                                var c = document.getElementById("enemy_health");
								var ctx = c.getContext("2d");

								ctx.beginPath();
								ctx.rect(0, 0,300, 30);
								ctx.fillStyle = "green";
								ctx.fill();

                                fight();
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
                    }; 
                    //a user or enemy has been picked
                    clickType = true;

                });

            };

            displayCharacter(user)
            pickCharacter(luke, clickUser, rebel, user);
            pickCharacter(obiWan, clickUser, rebel, user);
            pickCharacter(hanSolo, clickUser, rebel, user);

            var fight = function() {
                $("#choose_character").html("<div id='fight'><h5>FIGHT</h5></div>")
                $("#fight").click(function() {
                	//generate random number
                    var random = Math.floor(Math.random() * 100);
                    //if enemy is alive
                    if (user[0].health > 0) {
                    	//if attack hits enemy
                        if (enemy[0].luck < random) {
                        	//checks if critical hit occurs
                            if (random > 75) {
                                criticalHit = true;
                                alert("Critcal Hit!!");
                            }
                            //if critical hit is true then deal critical damage
                            if (criticalHit === true) {
                                attackCounter = attackCounter + 5
                                user[0].attack = user[0].attack + attackCounter + 30;

                                var c = document.getElementById("your_health");
								var ctx = c.getContext("2d");

								ctx.beginPath();
								ctx.rect(0, 0, user[0].health * 3, 30);
								ctx.fillStyle = "green";
								ctx.fill();
                            // else deal normal damage
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

                            //adjusts enemy health by damge dealt this click
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
                    //if enemy is alive
                    if (enemy[0].health > 0) {
                    	//if attack hits enemy
                        if (user[0].luck < random) {
                            user[0].health = user[0].health - enemy[0].attack;

                                var c = document.getElementById("enemy_health");
								var ctx = c.getContext("2d");

								ctx.beginPath();
								ctx.rect(0, 0, enemy[0].health * 3, 30);
								ctx.fillStyle = "green";
								ctx.fill();
                        } else {
                            alert("You dodged the enemy attack!");
                        };
                        console.log(user[0])
                        console.log(enemy[0])
                    } else {
                        console.log("enemy has died")
                        if (enemy[0] === vader) {
                            graveyard.push(vader)
                            $(vader.id).remove();
                            enemy.pop(vader);

                            console.log(graveyard.length)
                            if (graveyard.length === 1) {
                                $("#pick_your_character").append(bobaFett.icon, jarjar.icon);
                                pickCharacter(bobaFett, clickEnemy, empire, enemy);
                                pickCharacter(jarjar, clickEnemy, empire, enemy);
                                console.log(enemy);
                                console.log(user);
                            } else if (graveyard.length === 2) {
                                if (graveyard.indexOf(jarjar) < 0) {
                                    $("#pick_your_character").append(jarjar.icon);
                                    pickCharacter(jarjar, clickEnemy, empire, enemy);
                                } else {
                                    $("#pick_your_character").append(bobaFett.icon);
                                    pickCharacter(bobaFett, clickEnemy, empire, enemy);
                                }
                            } else if (graveyard.length === 3) {
                                alert("you win!");
                                window.location.href = "starwars.html";
                            } else {};

                        } else if (enemy[0] === bobaFett) {
                            graveyard.push(bobaFett)
                            $(bobaFett.id).remove();
                            enemy.pop(bobaFett);

                            if (graveyard.length === 1) {
                                $("#pick_your_character").append(vader.icon, jarjar.icon);
                                pickCharacter(vader, clickEnemy, empire, enemy);
                                pickCharacter(jarjar, clickEnemy, empire, enemy);
                                console.log(enemy);
                                console.log(user);
                            } else if (graveyard.length === 2) {
                                if (graveyard.indexOf(vader) < 0) {
                                    $("#pick_your_character").append(vader.icon);
                                    pickCharacter(vader, clickEnemy, empire, enemy);
                                } else {
                                    $("#pick_your_character").append(jarjar.icon);
                                    pickCharacter(jarjar, clickEnemy, empire, enemy);
                                }
                            } else if (graveyard.length === 3) {
                                alert("you win!");
                                window.location.href = "starwars.html";
                            } else {};

                        } else if (enemy[0] === jarjar) {
                            graveyard.push(jarjar)
                            $(jarjar.id).remove();
                            enemy.pop(jarjar);
                            if (graveyard.length === 1) {
                                $("#pick_your_character").append(bobaFett.icon, vader.icon);
                                pickCharacter(bobaFett, clickEnemy, empire, enemy);
                                pickCharacter(vader, clickEnemy, empire, enemy);
                                console.log(enemy);
                                console.log(user);
                            } else if (graveyard.length === 2) {
                                if (graveyard.indexOf(bobaFett) < 0) {
                                    $("#pick_your_character").append(bobaFett.icon);
                                    pickCharacter(bobaFett, clickEnemy, empire, enemy);;
                                } else {
                                    $("#pick_your_character").append(vader.icon);
                                    pickCharacter(vader, clickEnemy, empire, enemy);
                                }
                            } else if (graveyard.length === 3) {
                                alert("you win!");
                                window.location.href = "starwars.html";
                            } else {
                            	console.log("invalid");
                            };


                        } else {
                            alert("you win!");
                            window.location.href = "starwars.html";
                        };


                    };



                });

            };











});//end of script