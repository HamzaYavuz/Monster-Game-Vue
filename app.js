new Vue({
    el:"#app",
    data:{
        player_heal:100,
        monster_heal:100,
        game_is_on: false,
        attack_multiple : 10,
        special_attack_multiple : 25,
        help_on_multiple: 20,
        monster_attack_multiple: 25,
        logs : []
    },
    methods:{
        start_game: function(){
            this.game_is_on = true
        },
        attack: function(){
            var point = Math.ceil(Math.random() * this.attack_multiple);
            this.monster_heal -= point;
            this.monster_attack();
            this.add_to_log({turn: "p", text: "OYUNCU ATAĞI (" + point +  ")"})
            console.log("M: " + this.monster_heal);
            console.log("P: " + this.player_heal);

        },
        special_attack: function(){
            var point = Math.ceil(Math.random() * this.special_attack_multiple);
            this.monster_heal -= point;
            this.monster_attack();
            this.add_to_log({turn: "p", text: "ÖZEL ATAK (" + point + ")"})

        },
        help_on: function(){
            var point = Math.ceil(Math.random() * this.help_on_multiple);
            this.player_heal += point;
            this.monster_attack();
            this.add_to_log({turn: "p", text: "İLK YARDIM (" + point + ")"})
        },
        give_up: function(){
            this.player_heal = 0
            this.add_to_log({turn:"p", text:"PES ETTİ !!"})
        },
        monster_attack: function(){
            var point = Math.ceil(Math.random() * this.monster_attack_multiple);
            this.player_heal -= point;
            this.add_to_log({turn: "m", text: "MONSTER SALDIRI ("+ point + ")"})

        },
        add_to_log: function(log){
            this.logs.push(log);
        }

    },
    watch:{
        player_heal : function(value){
            if(value<0){
                this.player_heal = 0;
                if(confirm("Oyunu KAYBETTİN. Yenidden oynamak ister misin?")){
                    this.player_heal = 100,
                    this.monster_heal = 100,
                    this.logs = []
                }
            } else if(value>100){
                this.player_heal = 100;
            }
        },
        monster_heal : function(value){
            if(value<0){
                this.monster_heal=0;
                if(confirm("Oyunu KAZANDIN. Yenidden oynamak ister misin?")){
                    this.player_heal = 100,
                    this.monster_heal = 100,
                    this.logs = []
                }
            }
        }
    }
})