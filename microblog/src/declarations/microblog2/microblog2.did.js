export const idlFactory = ({ IDL }) => {
  const Message = IDL.Text;
  return IDL.Service({
    'follow' : IDL.Func([IDL.Principal], [], []),
    'follows' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'post' : IDL.Func([IDL.Text], [], []),
    'posts' : IDL.Func([], [IDL.Vec(Message)], ['query']),
    'timeline' : IDL.Func([], [IDL.Vec(Message)], []),
  });
};
export const init = ({ IDL }) => { return []; };
