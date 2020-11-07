import React from 'react'
import Header from './components/Header'
import Step1 from './components/Step1'
import { Route, Switch} from 'react-router-dom'
import Step2 from './components/Step2'
import { BrowserRouter } from 'react-router-dom'
import Step3 from './components/Step3'
import Alert from './components/Alert'

const App = (props) => {
  console.log(props)
  return (
    
    <div>
      <BrowserRouter>  
      <Header/>
      <Alert/>
      <div className="container">
      <Switch>
      <Route path='/step2' component={Step2} />
      <Route path='/step3' component={Step3} />
      <Route exact path='/' component={Step1} />
      
      </Switch>
        
      
      
      </div>
      </BrowserRouter>
      
</div>
    
    
    
    
    
  )
}

export default App
