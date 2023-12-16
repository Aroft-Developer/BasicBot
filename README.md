
# :robot: **Basic Bot by Aroft**

## :pencil: **Description**
T'as toujours réver d'avoir ton premier bot Discord alors tu es au bonne endroit. Il te suffit de suivre ces étapes et le trvail est fait ....

## :gear: **Fonctionnalités**
- Moderation, Information, Gestion

## :wrench: **Configuration**

### **Prérequis**
- Discord.js (version 14.11.0)
- mysql (version 2.18.1)
- phpMyAdmin (voir étape instalation)

### **Étapes d'installation**
1. Clone le repository : `git clone https://github.com/Aroft-Developer/BasicBot.git`
2. Installe les dépendances : `npm install`
3. Utilise phpMyAdmin et met le fichier `basicbot.sql` dessus si tu n'as pas phpMyAdmin ou que tu ne sais pas l'utiliser je t'invite à te rendre dans le serveur https://discord.gg/cloudhive et demander un hébergeur avec phpMyAdmin pour le basic Bot (de la part d' aroft) C'EST TOTALEMENT GRATUIT !!!
4. Configure ton fichier de configuration `config.json` avec les informations nécessaires.
5. Lance le bot : `node index.js`

### **Configuration du fichier `config.json`**
```json
{
  "token": "TON_TOKEN_BOT",
  "linkbot": "Lien_du_bot",
  "colorbot" : "",

  "BDD": {
        "host": "HOST",
        "user": "USER",
        "password": "PASSWORD",
        "database": "basicbot",
    }
  
}
```

## :raised_hands: **Contribution**
Si tu souhaites contribuer à ce projet, n'hésite pas à ouvrir une pull request !

## :page_facing_up: **License**
Ce projet est sous license Apache. Voir le fichier `LICENSE` pour plus d'informations.

## **Support**
Message Privé: aroft


