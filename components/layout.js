import globalStyles from '../styles/global.js';
import Nav from './nav';

function Layout({ children }) {
  return (
    <div className='page-layout'>
      <Nav />
      {children}
      <style jsx global>
        {globalStyles}
      </style>
    </div>
  );
}

export default Layout;
