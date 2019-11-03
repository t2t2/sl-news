import {ReactWrapper} from 'enzyme'
import {act} from 'react-dom/test-utils'

// https://github.com/airbnb/enzyme/issues/2073#issuecomment-531488981
// https://github.com/wesbos/waait/blob/master/index.js
export async function wait(amount = 0): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, amount))
}

// Use this in your test after mounting if you need just need to let the query finish without updating the wrapper
export async function actWait(amount = 0): Promise<void> {
	await act(async () => {
		await wait(amount)
	})
}

// Use this in your test after mounting if you want the query to finish and update the wrapper
export async function updateWrapper(wrapper: ReactWrapper, amount = 0): Promise<void> {
	await act(async () => {
		await wait(amount)
		wrapper.update()
	})
}
