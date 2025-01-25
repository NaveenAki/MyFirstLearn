import { Component } from '@angular/core';
import Speech from 'speak-tts'

@Component({
    selector: 'kids-cmp',
    moduleId: module.id,
    templateUrl: 'kids.component.html'
})

export class KidsComponent{

    html = '';
    result = '';
    speech: any;
    speechData: any;

    constructor(){
        this.speech = new Speech(); // will throw an exception if not browser supported
        if(this.speech .hasBrowserSupport()) { // returns a boolean
            console.log("speech synthesis supported")
            this.speech.init({
                    'volume': 1,
                    'lang': 'en-GB',
                    'rate': 1,
                    'pitch': 1,
                    'voice':'Google UK English Male',
                    'splitSentences': true,
                    'listeners': {
                        'onvoiceschanged': (voices) => {
                            console.log("Event voiceschanged", voices)
                        }
                    }
            }).then((data) => {
                // The "data" object contains the list of available voices and the voice synthesis params
                console.log("Speech is ready, voices are available", data)
                this.speechData = data;
                data.voices.forEach(voice => {
                console.log(voice.name + " "+ voice.lang)
                });
            }).catch(e => {
                console.error("An error occured while initializing : ", e)
            })
        }
    }
    

    start(event: Event){
        debugger;

        const target = event.currentTarget as HTMLElement;

        const html = target.dataset.value || ''; 
        this.html = html;

        var temporalDivElement = document.createElement("div");
        
        temporalDivElement.innerHTML = this.html;

        this.result = temporalDivElement.textContent || temporalDivElement.innerText || "";

        this.speech.speak({
            text: this.result,
        }).then(() => {
            console.log("Success !")
        }).catch(e => {
            console.error("An error occurred :", e) 
        })
    }

    
  
    
}
