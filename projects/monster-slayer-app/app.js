new Vue({
    el: '#app',
    data: {
        playerHealth: 0,
        monsterHealth: 0,
        gameIsRunning: false,
        turns: []
    },
    computed: {
    
    },
    methods: {
        getWidthProgressBarStyle: function(health){
            return {
                'width': health + '%'
            }
        },
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = []
        },
        attack: function(){
            let damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            })
            if (this.checkWin()){
                return
            }

            this.monsterAttacks();
        },
        specialAttack: function(){
            let damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster Hard for ' + damage
            })
            if (this.checkWin()) {
                return
            }

            this.monsterAttacks();
        },
        heal: function(){
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
            }else{
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            })
            
            this.monsterAttacks();
        },
        giveUp: function(){
            this.gameIsRunning = false;
            this.playerHealth = 0;
        },
        monsterAttacks: function() {
            let damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            })
            this.checkWin()
        },
        calculateDamage: function(minDamage, maxDamage){
            return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
        },
        checkWin: function(){
            if (this.monsterHealth <= 0) {
                if(confirm('You Won! New Game?')){
                    this.startGame();
                }else{
                    this.monsterHealth = 0;
                    this.gameIsRunning = false;
                }
                return true;
            }else if (this.playerHealth <= 0){
                if (confirm('You Lost! New Game?')) {
                    this.startGame();
                } else {
                    this.playerHealth = 0;
                    this.gameIsRunning = false;
                }
            }
            return false;
        }
    }
});