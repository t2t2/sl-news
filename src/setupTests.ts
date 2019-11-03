// And pray no git muckups happen
/* eslint-disable unicorn/filename-case */
import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()})
