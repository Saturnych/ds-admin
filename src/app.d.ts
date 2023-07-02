import type { Session } from 'svelte-kit-cookie-session';

interface SessionData {
	views: number;
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			session: Session<SessionData>; //import('svelte-kit-cookie-session').Session<SessionData>;
		}

		interface PageData {
			session: SessionData;
		}

		interface Platform {}

		interface PrivateEnv {}

		interface PublicEnv {}
	}
}

export {};
