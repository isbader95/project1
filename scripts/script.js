'use strict'

// Description:
//   Example scripts for you to examine and try out.
//
// Notes:
//   They are commented out by default, because most of them are pretty silly and
//   wouldn't be useful and amusing enough for day to day huboting.
//   Uncomment the ones you want to try and experiment with.
//
//   These are from the scripting documentation: https://github.com/github/hubot/blob/master/docs/scripting.md

/*
HUBOT_SLACK_TOKEN=xoxb-547145739078-545568674948-LGic0NSrcsWJtOdcWOcvEO8C bin/hubot --adapter slack
*/

module.exports = (robot) => {
  
  const greet = ['Hello', 'Yo', 'Hi' ,'Whats up']
  
  robot.respond(`/${greet.join('|')}/i`, (res) => 
  {
    res.send(res.random(greet)+" Iam DeBot How can i Help you --For more information please type (dabot_f)")
  })
 
  const help_guide = [
    {check_class : "Do we have class today"},
    {git_help: "Ask for a git command to identify its perpouse"},
    {exit: "Request a GA class Exit ticket"},
    {invite:"Request the Slack invitation link"}
    ]

    robot.hear(/dabot_f/i ,(res) => 
    {
    Object.keys(help_guide).forEach(function(key){

        var inner_keys = (key, help_guide[key]);

        Object.keys(inner_keys).forEach(function(key){

            var deep_inner_keys = (key  , inner_keys[key]);
            var json_deep_keys = (JSON.stringify(key + ' : ' +deep_inner_keys))

            res.send(json_deep_keys)
            

        })
    })
})


  const date1 = new Date()
  const days = (date1.getDay());
  const days_arr = ['Sunday','Monday','Tusday',                        'Wednesday','Thirsday','Friday',                    'Saterday']
  var Today ="";
 

  robot.hear(/do we have class/i ,(res) => 
    {
      days_arr.forEach(function(currentValue,index,array)
    {
    if(index === days)
      {
        Today = (currentValue)
      }
  })
    if (Today === "Monday" || Today==="Wednesday")
        {
          res.send("Today is: " + Today+ " so we have class");
        } 
        else 
        {
          res.send("Today is : "+Today+" so we don't have class");
        }
})
  
  robot.hear(/git_help/i, (res) => {
    res.emote('What git command are you having trouble with??')
 
    robot.respond(/(.*)/i, (res) => 
      {
      const git_command = res.match[1]
  
      if (git_command === 'git init') 
        {
          res.reply('This command will create a new repository')
        }
      else if(git_command === 'git add') 
        {
          res.reply('This command will propose changes (add it to the Index)')
        }
      else if(git_command === 'git commit') 
        {
          res.reply('This command will commit the changes to the head repository')
        }
      else if(git_command === 'git clone')
        {
          res.reply('create a working copy of a local repository')
        }
      else if(git_command === 'git push')
        {
          res.reply('This command will send the changes to a remote repository')
        }


      return
    })
  })

  robot.topic((res) => {
    res.send(`${res.message.text}? That’s a Paddlin`)
  })
  
  const enterReplies = ['Hi', 'Target Acquired', 'Firing', 'Hello friend.', 'Gotcha', 'I see you']
  const leaveReplies = ['Are you still there?', 'Target lost', 'Searching']
  
  robot.enter((res) => {
    res.send(res.random(enterReplies))
  })
  robot.leave((res) => {
    res.send(res.random(leaveReplies))
  })


const Exit_Tiket = "https://docs.google.com/forms/d/e/1FAIpQLSeesS4JlEucM097ZlYR1CJTPE21TihB66hLjoEFeVABk0F_gQ/viewform"
const Slack_chat = "https://join.slack.com/t/myteam-h5o6000/shared_invite/enQtNTQ1NzIzODUwMzU0LTA4MTI0OTJlZDNhZThmNjk3ZDM5ZjNjZmFiN2Y1YTNlZTEzMWIzODIyZTlhOGUyOTlmMzMwOTE1MGI5MzQzZGY"


  robot.respond(/exit$/, res => {
    res.reply(Exit_Tiket)
  })

  robot.respond(/invite$/, res => {
    res.reply(Slack_chat)
  })


  const answer = process.env.HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING
  
  robot.respond(/what is the answer to the ultimate question of life/, (res) => {
    if (answer) {
      res.send(`${answer}, but what is the question?`)
      return
    }
  
    res.send('Missing HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING in environment: please set and try again')
  })
  
  robot.respond(/you are a little slow/, (res) => {
    setTimeout(() => res.send('Who you calling "slow"?'), 60 * 1000)
  })
  
  let annoyIntervalId = null
  
  robot.respond(/annoy me/, (res) => {
    if (annoyIntervalId) {
      res.send('AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH')
      return
    }
  
    res.send('Hey, want to hear the most annoying sound in the world?')
    annoyIntervalId = setInterval(() => res.send('AAAAAAAAAAAEEEEEEEEEEEEEEEEEEEEEEEEIIIIIIIIHHHHHHHHHH'), 1000)
  })
  
  robot.respond(/unannoy me/, (res) => {
    if (!annoyIntervalId) {
      res.send('Not annoying you right now, am I?')
      return
    }
  
    res.send('OKAY, OKAY, OKAY!')
    clearInterval(annoyIntervalId)
    annoyIntervalId = null
  })
  
  
  robot.router.post('/hubot/chatsecrets/:room', (req, res) => {
    const room = req.params.room
    const data = JSON.parse(req.body.payload)
    const secret = data.secret
  
    robot.messageRoom(room, `I have a secret: ${secret}`)
  
    res.send('OK')
  })
  
  robot.error((error, response) => {
    const message = `DOES NOT COMPUTE: ${error.toString()}`
    robot.logger.error(message)
  
    if (response) {
      response.reply(message)
    }
  })
  
  robot.respond(/have a soda/i, (response) => {
    // Get number of sodas had (coerced to a number).
    const sodasHad = +robot.brain.get('totalSodas') || 0
  
    if (sodasHad > 4) {
      response.reply('I’m too fizzy…')
      return
    }
  
    response.reply('Sure!')
    robot.brain.set('totalSodas', sodasHad + 1)
  })
  
  robot.respond(/sleep it off/i, (res) => {
    robot.brain.set('totalSodas', 0)
    res.reply('zzzzz')
  })
 }
