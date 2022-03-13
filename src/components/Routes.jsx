import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Projets from '../pages/Projets'

import Generateur from '../pages/Generateur/Generateur'
import AddProjet from '../pages/Generateur/Projets/AddProjet/AddProjet'

import UnitList from '../pages/Generateur/Units/UnitList'
import AddUnit from '../pages/Generateur/Units/AddUnit/AddUnit'

import LessonList from '../pages/Generateur/Lessons/LessonList'
import AddLesson from '../pages/Generateur/Lessons/AddLesson/AddLesson'

import ExerciseList from '../pages/Generateur/Exercises/ExerciseList'
import AddExercise from '../pages/Generateur/Exercises/AddExercise/AddExercise'

import Vocabulaire from '../pages/Generateur/Vocabulaire/Vocabulaire'
import Game from '../pages/Generateur/Game/Game'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/projets' component={Projets}/>

            <Route path='/generateur' component={Generateur}/>
            <Route path='/add-projet' component={AddProjet}/>

            <Route path='/unit-list' component={UnitList}/>
            <Route path='/add-unit' component={AddUnit}/>

            <Route path='/lesson-list' component={LessonList}/>
            <Route path='/add-lesson' component={AddLesson}/>

            <Route path='/exercise-list' component={ExerciseList}/>
            <Route path='/add-exercise' component={AddExercise}/>

            <Route path='/vocabulaire-list' component={Vocabulaire}/>
            <Route path='/game' component={Game}/>
        </Switch>
    )
}

export default Routes