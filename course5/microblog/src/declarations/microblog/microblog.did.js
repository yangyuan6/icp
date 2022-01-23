export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Message = IDL.Record({
    'text' : IDL.Text,
    'time' : Time,
    'author' : IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    'allposts' : IDL.Func([IDL.Text], [IDL.Vec(Message)], []),
    'follow' : IDL.Func([IDL.Principal], [], []),
    'follows' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'followsname' : IDL.Func([], [IDL.Vec(IDL.Opt(IDL.Text))], ['query']),
    'get_name' : IDL.Func([], [IDL.Opt(IDL.Text)], []),
    'post' : IDL.Func([IDL.Text], [], []),
    'posts' : IDL.Func([Time], [IDL.Vec(Message)], ['query']),
    'set_name' : IDL.Func([IDL.Text], [], []),
    'timeline' : IDL.Func([Time], [IDL.Vec(Message)], []),
    'unpost' : IDL.Func([], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
