import React, { Component } from 'react';
import './App.css';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false
        };
    }
    componentDidMount() {
        fetch('http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products/1')
            .then(res => res.json())
            .then(data => this.setState({ items: data, isLoaded: true },console.log(data)));
        
        

    }

    render() {
        let { items, isLoaded } = this.state;
        let conditioner = [];
        let measurements = [];
        if (items['objects']) {
            
            for (let i = 0; i < items['objects'].length; i++) {
                if (items['objects'][i].category == 'Air Conditioners') {
                    conditioner.push(items['objects'][i]);
                }
            }
            for (let i = 0; i < conditioner.length; i++) {
                let result = conditioner[i]['size']['width'] * conditioner[i]['size']['length'] * conditioner[i]['size']['height'] * 250 / 1000000;
                measurements.push(result);

                
            }
            let average = 0
            for (let i = 0; i < measurements.length; i++) {
                average = average + measurements[i];
            }
            average = average / measurements.length;
            average = Math.round(average * 1000) / 1000;
            
            if (average > 0) {
                return (
                    <div><h1 style={{padding:"30px"}}> Average weight :{average}</h1></div>);
            }
            else
                return (
                    <div>No items found</div>);
        }
        else {
            return (
                <div>No items found</div>);
        }
       
    }
        
}
export default App;
