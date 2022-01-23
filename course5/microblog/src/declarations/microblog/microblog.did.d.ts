import type { Principal } from '@dfinity/principal';
export interface Message {
  'text' : string,
  'time' : Time,
  'author' : [] | [string],
}
export type Time = bigint;
export interface _SERVICE {
  'allposts' : (arg_0: string) => Promise<Array<Message>>,
  'follow' : (arg_0: Principal) => Promise<undefined>,
  'follows' : () => Promise<Array<Principal>>,
  'followsname' : () => Promise<Array<[] | [string]>>,
  'get_name' : () => Promise<[] | [string]>,
  'post' : (arg_0: string) => Promise<undefined>,
  'posts' : (arg_0: Time) => Promise<Array<Message>>,
  'set_name' : (arg_0: string) => Promise<undefined>,
  'timeline' : (arg_0: Time) => Promise<Array<Message>>,
  'unpost' : () => Promise<undefined>,
}
