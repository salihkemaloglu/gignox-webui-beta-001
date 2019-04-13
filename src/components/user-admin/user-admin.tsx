import * as React from 'react';

import i18next from '../localization'
export const UserAdmin = () => {
    return (
        <div>
            <div>navbar</div>
            <label>{i18next.t("hello")}</label>
            <div>
                <div><span>left</span></div>
                <div>
                    <div>
                        right up
               </div>
                    <div>
                        right down
               </div>
                </div>
            </div>
        </div>
    );
};


