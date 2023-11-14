import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();
const openai = new OpenAI(process.env.OPENAI_API_KEY);


//Syntax for getting models response: completion.choices[0].message.content

async function grade(def1, def2, word) {
  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content":`I'm giving you two definitions of the word ${word}`},
        {"role": "assistant", "content": `${def1}`},
        {"role": "assistant", "content": `${def2}`},
        {"role": "user", "content": "Are these definitions similar, respond with yes or no"}],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
  if(completion.choices[0].message.content ==="Yes"){
    return true;
  }
  return false;
}

function gradeTest(realDefs, testDefs){
    let score = 0;
    var finalScore = []
    for(let i = 0; i < realDefs.length; i++){
        var correct = grade(realDefs[i].def, testDefs[i].def, realDefs[i].word);
        if(correct){
            finalScore.push(1);
            score++;
        }else{
            finalScore.push(0)
        }
    }
}

