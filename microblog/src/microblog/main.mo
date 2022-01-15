import List "mo:base/List";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Time "mo:base/Time";

actor {
    public type Message = {
        message: Text;
        time: Time.Time;
    };
    public type Microblog = actor {
        follow: shared(Principal) -> async ();  // 添加关注对象
        follows: shared query() ->async [Principal];// 添加关注列表
        post: shared(Text) -> async (); // 发布新消息
        posts: shared query(Time.Time) -> async [Message]; // 返回所有发布的消息
        timeline : shared (Time.Time) -> async [Message] // 返回所有关注对象发布的消息
    };
    stable var followed : List.List<Principal> = List.nil();
    public shared func follow(id: Principal) : async(){
        followed := List.push(id, followed);
    };
    public shared query func follows() : async [Principal]{
        List.toArray(followed);
    };
    stable var messages : List.List<Message> = List.nil();
    public shared(msg) func post(text: Text) : async (){
        assert(Principal.toText(msg.caller) == "awqv6-k6gqx-jeddu-sjrgg-ssa3b-htbjy-ixfoe-76yro-sjn7n-zh3i4-aae");
        var blog = {
            message = text;
            time = Time.now();
        };
        messages := List.push(blog, messages)
    };
    public shared query func posts(since: Time.Time) : async [Message]{
        func f(message: Message): Bool{
            message.time >= since;
        };
        var res: List.List<Message> = List.filter(messages: List.List<Message>,f);
        List.toArray(res);
    };
    public shared func timeline(since: Time.Time):async [Message] {
        var all : List.List<Message> = List.nil();
        for (id in Iter.fromList(followed)) {
            let canister : Microblog = actor(Principal.toText(id));
            let msgs = await canister.posts(since);
            for (msg in Iter.fromArray(msgs)) {
                all := List.push(msg, all)
            }
        };
        List.toArray(all)
    }
};
