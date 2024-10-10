import FirstComponent from './FirstComponent'
import {FifthComponent} from './FirstComponent'
import SecondComponent from './SecondComponent'
import ThirdComponent from './ThirdComponent'
import FourthComponent from './FourthComponent'
import LearningJavascript from './LearningJavascript'

function LeaningComponent() {
    return (
      <div>
        <FirstComponent></FirstComponent>
        <SecondComponent></SecondComponent>
        <ThirdComponent/>
        <FourthComponent/>
        <FifthComponent/>
        <LearningJavascript />
      </div>
    );
  }
  
  export default LeaningComponent;