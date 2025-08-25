import views from './view/view';
import layouts from './layout/layout';
import composites from './composite/composite';

export default function() {
  views();
  layouts();
  composites();
}
