import './App.css';
import ToolbarT from './toolbar';
import { IFrame } from './iframe'
import * as Mui from '@material-ui/core';
import React, {useState, Component} from 'react';
import { Title } from './Title';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { ButtonAppBar } from './BottomBarApp';

const stylesObject = 
  {
    "background": "null",
    "color": null,
    "zIndex": null,
    "position": "",
    "width": "",
    "height": "",
    "top": "0",
    "left": "0",
    "right": "0",
    "bottom": "0",
    "padding": "0",
    "margin": "0",
    "marginLeft": "0",
    "fontSize": "",
    "fontFamily": ""
  }

const styles = Object.keys(stylesObject).map((key) => [key, stylesObject[key]]);

function App() {
  const [selectComponent, setSelectComponent] = useState({})
  const [myComponents, setMyComponents] = useState([]);
  const [components, setComponents] = useState([{
    component: Mui.Button,
    text: `Hello World`,
    editableText: true,
    type: 'button',
    id: ``,
    props: {
      variant: 'contained',
      color: 'primary',
      onClick: () => {

      },
    },
    style: stylesObject,
  },
  {
    component: Title,
    text: `My title`,
    id: ``,
    editableText: true,
    type: 'title',
    props: {
      
    },
    style: stylesObject,
  },
  {
    component: function Div(props) {
      return <>
      <div 
      {...props}
      style={{
            width: `200px`,
            height: `200px`,
            left: `0px`,
            background: props.background,
            border: `1px solid #ccc`
        }}>
      </div>
    </>
    },
    text: `Div`,
    id: ``,
    editableText: true,
    type: 'title',
    props: {
      
    },
    style: stylesObject,
  }
  ]);

  const addComponents = (component) => {
    let newComponent = {...component}
    newComponent.id = myComponents.length + 1
    setMyComponents([...myComponents, newComponent]);
  }

  return (
    <div className="App">
      <div style={{
        position: `fixed`,
        width: `200px`,
        height: `100%`,
        background: `red`,
        top: `48px`,
        zIndex: 5
      }}>
        <br/>
        <button onClick={() => addComponents(components[0])}>Adicionar botao</button>
        <button onClick={() => addComponents(components[1])}>Adicionar texto</button>
        <button onClick={() => addComponents(components[2])}>Adicionar Div</button>
      </div>

      <div style={{
        position: `fixed`,
        width: `298px`,
        height: `calc(100% - 48px)`,
        background: `rgba(0,0,0,.04)`,
        top: `48px`,
        zIndex: 5,
        right: `0`,
        overflowX: `hidden`,
        overflowY: `auto`
      }}>
        <br/>
        {selectComponent.component &&
        <Box
        sx={{
          width: 500,
          maxWidth: '90%',
        }}
        >
          <TextField 
          style={{
            marginLeft: `15px`,
            marginBottom: `10px`
          }}
          autoComplete='off'
          onKeyUp={(e) => {
            let oldMyComponents = [...myComponents]
            const index = oldMyComponents.findIndex(c => c.id === selectComponent.id)
            oldMyComponents[index].text = e.target.value
            setMyComponents(oldMyComponents);
          }}
          fullWidth label={selectComponent.text} id="fullWidth" />
          { styles.map((style) => (
            <TextField 
            style={{
              marginLeft: `15px`,
              marginBottom: `10px`
            }}
            autoComplete='off'
            onKeyUp={(e) => {
              document.querySelector(`#component_${selectComponent.id}`).style[style[0]] = e.target.value
            }}
            fullWidth label={style[0]} id="fullWidth" />
          )) }
        </Box>
        }  
      </div>


      <ToolbarT />
      <div id="fullscreen-root"
      style={{
        position: `fixed`,
        height: `calc(100% - 48px)`,
        width: `100%`,
        top: `48px`
      }}
      >
        <div 
        className='view container-view platform_cursor_default'>
          <IFrame
          onBlur={() => {
            setSelectComponent({})
          }}
          background={`white`}
          >
            
            { myComponents.map((Component) => (
              <>
                {selectComponent.id === Component.id &&
                  <span className='type-comp'>
                    { Component.type }
                  </span>
                }
                  <Component.component
                  onClick={() => {
                    setSelectComponent(Component)
                  }}
                  className={`${selectComponent.id === Component.id ? 'selected' : 'hover_select'}`}
                  style={Component.style}
                  id={`component_${Component.id}`}
                  {...Component.props}
                  key={Component} >
                    { Component.text ? Component.text.trim().length == 0 ? `Insira um texto` : Component.text : null }
                  </Component.component>
              </>
              
            ))}
          </IFrame>
        </div>
      </div>
      
    </div>
  );
}

export default App;
