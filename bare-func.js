/**
 * Primitive Data Structure for Algorithms in Javascript
 *
 * Accessor: methods that does not modify the data and used for accesing the data
 * Mutator: methods that modify the data (side effect)
 * Generic: methods that could be useful for the certain use cases.
 */

(function(){
    /////////////////////////////////
    // Ordered Pair Data Structure //
    /////////////////////////////////

    /**
     * Ordered Pair is a data structure containing two elements
     */
    function pair(x, y){
        return [x,y];
    }

    //////////////////////
    // Accessor Methods //
    //////////////////////
    function tail(pair){
        return pair[1];
    }

    function head(pair){
        return pair[0];
    }

    /////////////
    // Mutator //
    /////////////

    function set_head(pair, x){
        pair[0] = x;
    }

    function set_tail(pair, y){
        pair[1] = y;
    }

    function flip_pair(pair){
        var _tmp = pair[0];
        pair[0] = pair[1];
        pair[1] = _tmp;
    }


    /////////////////////////
    // List Data Structure //
    /////////////////////////

    /**
     * List is represented using pair whose 
     *     1st element represents the element of the list, while
     *     2nd element is either another list of the next elements 
     *         or an empty list.
     */
    function list() {
        var args = arguments;
        return Object.keys(arguments).reduceRight(function(accumulated, currentValue) {
            return pair(args[currentValue], accumulated);
        }, []);
    }

    /////////////
    // Generic //
    /////////////

    /** 
     * Return A new list with the Item at the back of the list
     */
    function append(lst, item){
        return extend(lst, list(item));
    }

    /**
     * Combine list such that it returns [First List + second List]
     */
    function extend(lst1, lst2){
        if (is_empty_list(lst1)){
            return lst2;
        } else {
            return pair(head(lst1), extend(tail(lst1), lst2));
        }

    }

    function insert(lst, index, item){
        // TODO
    }

    function length(lst){
        // TODO
    }

    /**
     * Find Item that is equivalent and remove it from the list
     */
    function remove(item, lst){
        return filter(function(x){
            return x !== item;
        }, lst);
    }

    /**
     * Check for an empty list
     */
    function is_empty_list(lst){
        return lst.length === 0;
    }

    /**
     * Zipper will apply two list in parallel into the function provided
     * Zip function will take 3 arguments, 
     * @param {function} func two argument as follows: 
     *     @param {any} 1st params be the element iterated from the first list
     *     @param {any} 2nd params be the element iterated from the second list
     * @param {list} lst1 the first list to be iterated
     * @param {list} lst2 the second list to be iterated
     * @return {list} results from applying the func against each of the 2 list
     */
    function zip(func, lst1, lst2){
        if (is_empty_list(lst1)){
            return [];
        } else {
            return pair(
                func(head(lst1), head(lst2)),
                zip(func, tail(lst1), tail(lst2)));
        }
    }

    /**
     * Reduce Left
     * Combining the result of recursively combining all elements but the last one, with the last element 
     * [1,2,3,4,5] ==> (((1 + 2) + 3) + 4) + 5
     */
    function reduce_left(func, initial, lst){
        function reduce(accumulated, remaining){
            if (is_empty_list(remaining)){
                return accumulated;
            } else {
                return iter(func(accumulated, head(remaining)), tail(remaining));
            }
        }
        return reduce(initial, lst);
    }

    /**
     * Reduce Right
     * Combining the first element with the result of recursively combining the rest
     * [1,2,3,4,5] ==> 1 + (2 + (3 + (4 + 5)))
     */
    function reduce_right(func, initial, lst){
        if (is_empty_list(lst)){
            return initial;
        } else {
            return func(head(lst), reduce_right(func, initial, tail(lst)));
        }
    }

    /** Reverse using reduce_left */
    function reverse(lst){
        return reduce_left(function(a,b){ return pair(b,a); }, [], lst);
    }
    /** Reverse using reduce_right */
    function reverse(lst){
        return reduce_right(function(a,b){ return append(b,list(a)); }, [], lst);
    }

    /////////
    // Map //
    /////////
    function map(func, lst){
        if (is_empty_list(lst)){
            return [];
        } else {
            return pair(func(head(lst)), map(func, tail(lst)));
        }
    }

    ////////////
    // Filter //
    ////////////
    function filter(func, lst){
        if (is_empty_list(lst)){
            return [];
        } else {
            if (func(head(lst))){
                return pair(head(lst), filter(func, tail(lst)));
            } else {
                return filter(func, tail(lst));
            }
        }
    }

}).call(this);