import { toast } from '@zerodevx/svelte-toast';

export const errorToast = (m: string) =>
	toast.push(m, {
		theme: {
			'--toastBackground': 'red'
		}
	});
