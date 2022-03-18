<script setup>
import { ref, computed } from "vue";
// Ref permet d'avoir un objet réactif et modifiable
// Computed nous permet de renvoyer en direct le score et le numéro de la question actuelle

const questions = ref([
  {
    question: "Qu'est-ce que Vue JS ?",
    answer: 0,
    options: [
      "Un framework front-end",
      "Une librairie d'animation JS",
      "Un langage back-end",
    ],
    selected: null,
  },
  {
    question: "Qui a créé VueJs ?",
    answer: 0,
    options: ["Evan You", "Google", "Ryan Dahl"],
    selected: null,
  },
  {
    question: "Comment installer Vue ressource ?",
    answer: 2,
    options: [
      "npm install Vue@latest",
      "yarn plugin import vue",
      "npm install vue-ressource",
    ],
    selected: null,
  },
  {
    question: "À quoi sert l'élément <template> ?",
    answer: 1,
    options: [
      "À rien",
      "À utiliser des directives de Vue sans créer un élément html",
      "À insérer un lien de template",
    ],
    selected: null,
  },
  {
    question: "Que permet de faire la commande 'npm run dev' ?",
    answer: 2,
    options: [
      "De publier notre site en ligne",
      "D'importer des fonctionnalités Vue",
      "De lancer un serveur local",
    ],
    selected: null,
  },
  {
    question: "Comment créer un composant Vue JS ?",
    answer: 0,
    options: [
      "Vue.component('my-component-name', { /* ... */ })",
      "<component v-bind:is='currentTabComponent'></component>",
      "npm create new composant",
    ],
    selected: null,
  },
  {
    question: "À quoi sert ce lien: 'https://unpkg.com/vue@3' ?",
    answer: 1,
    options: [
      "C'est la documentation de Vue",
      "Cela permet de lancer Vue sans l'étape du Build",
      "À rien c'était un piège",
    ],
    selected: null,
  },
]);

const quizzCompleted = ref(false);
const currentQuestion = ref(0);
const score = computed(() => {
  let value = 0;

  // Si on selcetionne la bonne réponse
  questions.value.map((q) => {
    if (q.selected != null && q.answer == q.selected) {
      console.log("correct");
      value++;
    }
  });
  return value;
});

const getCurrentQuestion = computed(() => {
  let question = questions.value[currentQuestion.value];
  question.index = currentQuestion.value;
  return question;
});

const setAnswer = (e) => {
  questions.value[currentQuestion.value].selected = e.target.value;
  e.target.value = null;
};

const nextQuestion = () => {
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++;
    return;
  }

  quizzCompleted.value = true;
};
</script>

<template>
  <main class="app">
    <h1>Vue Quizz</h1>
    <button id="re">Recommencer ?</button>
    <br />
    <section class="quiz" v-if="!quizzCompleted">
      <div class="quiz-info">
        <strong>
          <span class="question">{{ getCurrentQuestion.question }}</span>
        </strong>
        <span class="score">Score {{ score }} / {{ questions.length }}</span>
      </div>

      <div class="options">
        <!-- Si la question est égal à index et donc à bonne option -->
        <!-- Si index est égal à la bonne réponse alors correct -->
        <label
          v-for="(option, index) in getCurrentQuestion.options"
          :key="index"
          :class="`option ${
            getCurrentQuestion.selected == index
              ? index == getCurrentQuestion.answer
                ? 'correct'
                : 'wrong'
              : ''
          } ${
            getCurrentQuestion.selected != null &&
            index != getCurrentQuestion.selected
              ? 'disabled'
              : ''
          }`"
        >
          <!-- Si index n'est pas la bonne réponse -->
          <input
            type="radio"
            :name="getCurrentQuestion.index"
            :value="index"
            v-model="getCurrentQuestion.selected"
            :disabled="getCurrentQuestion.selected"
            @change="setAnswer"
          />

          <span>{{ option }}</span>
        </label>
      </div>

      <button @click="nextQuestion" :disabled="!getCurrentQuestion.selected">
        <!-- Si c'est la dernière question, le btn devient 'fini' -->
        {{
          getCurrentQuestion.index == questions.length - 1
            ? "Fini"
            : getCurrentQuestion.selected == null
            ? "Selectionnez une réponse"
            : "Question Suivante"
        }}
      </button>
    </section>

    <section v-else>
      <h2>Vous avez fini le quizz !</h2>
      <p v-if="score === questions.length">
        Bravo, un sans-faute ! Votre score est de {{ score }} /
        {{ questions.length }}
      </p>
      <p v-else="score !== questions.length">
        Votre score est de {{ score }} / {{ questions.length }}, continuez !
      </p>
      <p>Vous voulez progresser ? RDV sur la <a href="https://vue.doc.august1.dev/" target="_blank">Doc</a></p>
    </section>
  </main>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

body {
  background-color: #271c36;
  color: #fff;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  height: 100vh;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.quiz {
  background-color: #382a4b;
  padding: 1rem;
  width: 100%;
  max-width: 640px;
}

.quiz-info {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.quiz-info .question {
  color: #ffff;
  font-size: 1.25rem;
}

.quiz-info.score {
  color: #fff;
  font-size: 1.25rem;
}

.options {
  margin-bottom: 1rem;
}

.option {
  padding: 1rem;
  display: block;
  background-color: #271c36;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.option:hover {
  background-color: #2d213f;
}

.option.correct {
  background-color: #2cce7d;
}

.option.wrong {
  background-color: #ff5a5f;
}

.option:last-of-type {
  margin-bottom: 0;
}

.option.disabled {
  opacity: 0.5;
}

.option input {
  display: none;
}

button {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: #2cce7d;
  color: #2d213f;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.2rem;
  border-radius: 0.5rem;
}

button:disabled {
  opacity: 0.5;
}

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

p {
  color: #8f8f8f;
  font-size: 1.5rem;
  text-align: center;
}

a {
    text-decoration: none;
    color: #2cce7d;
}
</style>
