import * as React from "react";
import { LanguageState } from './lang-state';

export interface MultilanguageProps { compiler: string; framework: string; }

// 'MultilanguageProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class MultiLanguage extends React.Component<MultilanguageProps, LanguageState> {

    public constructor(props: MultilanguageProps, state: LanguageState) {
        super(props);
    
        this.state = {
            status: '',
            currentLanguage: 0
        };
    }

    public async componentWillMount() {
        console.log("componentWillMount!!");
        // get favorite language
        let favoriteLanguage = 'en'; 
        if (favoriteLanguage.search(/en/i) > -1) {
            this.setState({
                currentLanguage: 0
            });
        } else {
            this.setState({
                currentLanguage: 1
            });
        }
    }
}