import React from "react";

const Ping = () => {
    return (
        <div className="relative">
            <div className="abs-top-left">
                <span className="flex size-[11px] ping-wrapper">
                    <span className="ping-circle"></span>
                    <span className="rel-inline-circle"></span>
                </span>
            </div>
        </div>
    );
};

export default Ping;
