import axios from 'axios';
import crypto from 'crypto';
import type { Session } from 'svelte-kit-cookie-session';
import { redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { userId } from '$lib/stores';
import PUBLIC_ENV from '$lib/public';

export const userColor = (role: string) => {
    if (role === 'ADMIN') return 'stroke-warning';
    if (role === 'SUPER') return 'stroke-accent';
    return '';
}

export const isAdmin = (role: string) => {
    if (['ADMIN', 'SUPER'].includes(role))
        return true;
    else return false;
}

export const isSuper = (role: string) => {
    if (['SUPER'].includes(role))
        return true;
    else return false;
}

export const orgIdToName = (orgs: any, id: number) => {
    const result = orgs.find(e => e.id == id)
    return result.name
}

export const myUser = (session: Session | null) => {
    return session?.user ?? null;
}

export const myOrg = (session: Session | null) => {
    return session?.user.org ?? null;
}

export const myRole = (session: Session | null) => {
    return session?.user.role ?? null;
}

export const createHash = (data, type = 'md5', enc = 'hex') =>  crypto.createHash(type).update(data).digest(enc);

export const deleteAction = async (token: string = '', service: string = '', action: string = '', params: Record<string,any> = {}, cb?: Function): Promise<Record<string,any>> => {
  try {
    const uri = `/${service}${!!action ? '/'+action : ''}`;
    if (PUBLIC_ENV.DEV) console.info('deleteAction uri:', uri, 'Authorization:', !!token);
    const headers = !!token ? { Authorization: `Bearer ${token}` } : {};
    const axiosAuth = axios.create({
      baseURL: `${PUBLIC_ENV.PUBLIC_API_BASEURI}/${PUBLIC_ENV.PUBLIC_API_VERSION}`,
      headers,
    });
    if (cb) {
      axiosAuth.delete(uri, params).then(resp => cb(resp?.data));
    } else {
      return (await axiosAuth.delete(uri, params))?.data;
    }
  } catch (error) {
    console.error('Error:', error.code);
		return { error };
  }
}

export const getAction = async (token: string = '', service: string = '', action: string = '', params: Record<string,any> = {}, cb?: Function): Promise<Record<string,any>> => {
  try {
    const uri = `/${service}${!!action ? '/'+action : ''}`;
    if (PUBLIC_ENV.DEV) console.info('getAction uri:', uri, 'Authorization:', !!token);
    const headers = !!token ? { Authorization: `Bearer ${token}` } : {};
    const axiosAuth = axios.create({
      baseURL: `${PUBLIC_ENV.PUBLIC_API_BASEURI}/${PUBLIC_ENV.PUBLIC_API_VERSION}`,
      headers,
    });
    if (cb) {
      axiosAuth.get(uri, params).then(resp => cb(resp?.data));
    } else {
      return (await axiosAuth.get(uri, params))?.data;
    }
  } catch (error) {
    console.error('Error:', error.code);
		return { error };
  }
}

export const postAction = async (form: Record<string,any>, token: string = '', service: string = '', action: string = '', params: Record<string,any> = {}, cb?: Function): Promise<Record<string,any>> => {
  try {
    const uri = `/${service}${!!action ? '/'+action : ''}`;
    if (PUBLIC_ENV.DEV) console.info('postAction uri:', uri, 'Authorization:', !!token, 'form:', form);
    //const buff = new Buffer(`${PUBLIC_ENV.PUBLIC_ASR_USER}:${PUBLIC_ENV.PUBLIC_ASR_PASSWORD}`);
    const headers = !!token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' }; // Authorization: `Basic ${buff.toString('base64')}`
    const axiosAuth = axios.create({
      baseURL: `${PUBLIC_ENV.PUBLIC_API_BASEURI}/${PUBLIC_ENV.PUBLIC_API_VERSION}`,
      headers,
    });
    //auth: { username: PUBLIC_ENV.PUBLIC_ASR_USER, password: PUBLIC_ENV.PUBLIC_ASR_PASSWORD },
    //timeout: Number(PUBLIC_ENV.PUBLIC_ASR_TIMEOUT || '900'),
    if (cb) {
      axiosAuth.post(uri, form, params).then(resp => cb(resp?.data));
    } else {
      return (await axiosAuth.post(uri, form, params))?.data;
    }
  } catch (error) {
		console.error('Error:', error.code);
		return { error };
  }
};

export const destroySession = async (event): Promise<void> => {
	if (event.locals?.session) await event.locals.session.destroy();
	userId.set('');
	event.cookies.set('uid', '', {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: !dev,
		maxAge: 60 * 60 * 24 * 30
	});
};

export const saveSession = async (event, data): Promise<void> => {
	if (event.locals?.session) await event.locals.session.set(data);
	userId.set(data?.userId);
	if (!!data.userId) event.cookies.set('uid', data.userId, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: !dev,
		maxAge: 60 * 60 * 24 * 30
	});
};

export const refreshSession = async (event): Promise<string> => {
	const session = event.locals?.session?.data || event.data?.session;
	if (!session) return null;

	const post = await postAction({ token: session.refreshToken, type: 'Access'}, '', 'auth', 'token');
  if (PUBLIC_ENV.DEV) console.log('refreshSession post:', post);

  if (!!post?.data?.token) {
    session.accessToken = post.data.token;
    await saveSession(event, session);
  }
	//await event.locals.session.refresh(/** Optional new expiration time in days */);
	return session.accessToken;
};

export const logout = async (event: any, redirectPath: string = '/auth'): Promise<void> => {
	await destroySession(event);
	userId.update('');
	throw redirect(303, redirectPath);
};

export const deleteData = async (event: any, token: string, service: string = '', action: string = '', params: Record<string,any> = {}) => {
	let result = await deleteAction(token, service, action, params);
  if (PUBLIC_ENV.DEV) console.info('deleteData:', service, action, params, 'result:', result);
  if (result.error) {
    token = await refreshSession(event);
    result = await deleteAction(token, service, action, params);
  }
  return result;
};

export const getData = async (event: any, token: string, service: string = '', action: string = '', params: Record<string,any> = {}) => {
	let result = await getAction(token, service, action, params);
  if (PUBLIC_ENV.DEV) console.info('getData:', service, action, params, 'result:', result);
  if (result.error) {
    token = await refreshSession(event);
    result = await getAction(token, service, action, params);
  }
  return result;
};

export const postData = async (event: any, data: Record<string,any>, token: string, service: string = '', action: string = '', params: Record<string,any> = {}) => {
	let result = await postAction(data, token, service, action, params);
  if (PUBLIC_ENV.DEV) console.info('postData:', service, action, params, 'result:', result);
  if (result.error) {
    token = await refreshSession(event);
    result = await postAction(data, token, service, action, params);
  }
  return result;
};
