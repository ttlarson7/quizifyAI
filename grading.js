import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();
const openai = new OpenAI(process.env.OPENAI_API_KEY);


//Syntax for getting models response: completion.choices[0].message.content

async function grade(def1, def2, word) {
  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": "You are a helpful assistant."},//sets up the prompt
        {"role": "user", "content":`I'm giving you two definitions of the word ${word}`},
        {"role": "assistant", "content": `${def1}`},
        {"role": "assistant", "content": `${def2}`},
        {"role": "user", "content": "Are these definitions similar, respond with yes or no"}],
    model: "gpt-3.5-turbo",
  });

//   console.log(completion.choices[0]);
  if(completion.choices[0].message.content ==="Yes"){//gets the checks the response
    return true;
  }
  return false;
}

/*Possible Example array for realDefs and testDefs
    realDefs = [{term: "hello", def: "a greeting"}, {term: "goodbye", def: "a farewell"}]
    testDefs = [{term: "hello", def: "a greeting"}, {term: "goodbye", def: "a farewell"}

*/

var realDefs = ["a greeting", "a farewell"]
var testDefs = ["A way to great someone", "A banana"]
var terms = ["hello", "goodbye"]

async function gradeTest(realDefs, testDefs, terms){
    let score = 0;
    var finalScore = []
    for(var i = 0; i < realDefs.length; i++){
        var correct = await grade(realDefs[i], testDefs[i], terms[i]);
        // console.log(correct);
        if(correct){
            finalScore.push(1);
            score++;
        }else{
            finalScore.push(0)
        }
    }
    finalScore.push(score);
    return finalScore;
}

var score =  await gradeTest(realDefs, testDefs, terms);
console.log(score)


