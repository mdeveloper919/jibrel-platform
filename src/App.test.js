import render from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(div);
});
