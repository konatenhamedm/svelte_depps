import path from 'path';


import adapter from '@sveltejs/adapter-node';

export default {
 kit: {
  adapter: adapter(
	{out: 'build' 
		
	}
	
  ),
  alias: {
	$components: path.resolve('./src/components'),
  }
 }
};
