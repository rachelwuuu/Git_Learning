import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import canvas from './component/canvas'
{/*1.reactjs 2. bootstrap 3.svg from w3c 4. router? 5.react-bootstrap 6.regex */}
export default function App() {
    return (
        
               <Router>
                    <Switch>
                        <Route exact path="/" component={canvas} />
                    </Switch>
               </Router>
            
            
        
    )
}