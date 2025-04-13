
import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Calendar from '../components/Calendar/Calendar';
import Sidebar from '../components/Sidebar/Sidebar';
import { DragDropContext } from 'react-beautiful-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Index = () => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <DragDropContext onDragEnd={() => {}}>
          <div className="app-container">
            <Sidebar />
            <main className="main-content">
              <Calendar />
            </main>
          </div>
        </DragDropContext>
      </DndProvider>
    </Provider>
  );
};

export default Index;
