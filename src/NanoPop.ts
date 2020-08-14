export type VariantFlipOrder = {
    start: string;
    middle: string;
    end: string;
};

export type PositionFlipOrder = {
    top: string;
    right: string;
    bottom: string;
    left: string;
};

export type NanoPopPosition = 'top' | 'left' | 'bottom' | 'right';

export type NanoPopPositionCombination =
    'top-start' | 'top-middle' | 'top-end' |
    'left-start' | 'left-middle' | 'left-end' |
    'right-start' | 'right-middle' | 'right-end' |
    'bottom-start' | 'bottom-middle' | 'bottom-end' | NanoPopPosition;

type PositionPairs = [NanoPopPosition, NanoPopPosition];

type NanoPopOptions = {
    forceApplyOnFailure: boolean;
    container: DOMRect;
    position: NanoPopPositionCombination;
    variantFlipOrder: VariantFlipOrder;
    positionFlipOrder: PositionFlipOrder;
    margin: number;
    reference?: HTMLElement;
    popper?: HTMLElement;
};

type AvailablePositions = {
    t: number;
    b: number;
    l: number;
    r: number;
};

type AvailableVariants = {
    vs: number;
    vm: number;
    ve: number;
    hs: number;
    hm: number;
    he: number;
};


type NanoPop = {
    update(updatedOptions?: Partial<NanoPopOptions>): string | null; // TODO: types instead of 'string'?
};

interface NanoPopConstructor {

    /**
     * @param reference Reference element
     * @param popper Actual popper element
     * @param options Optional options
     */
    (reference: HTMLElement, popper: HTMLElement, options?: Partial<NanoPopOptions>): NanoPop;

    /**
     * @param options Partial options which get merged with the current one
     */
    (options?: Partial<NanoPopOptions>): NanoPop;
}


// Export current version
export const version = VERSION;

// Export default values
export const defaults = {
    defaultVariantFlipOrder: {start: 'sme', middle: 'mse', end: 'ems'},
    defaultPositionFlipOrder: {top: 'tbrl', right: 'rltb', bottom: 'btrl', left: 'lrbt'}
};

export const createPopper: NanoPopConstructor = (
    reference?: HTMLElement | Partial<NanoPopOptions>,
    popper?: HTMLElement,
    options?: Partial<NanoPopOptions>
) => {
    const baseOptions: NanoPopOptions = {
        positionFlipOrder: defaults.defaultPositionFlipOrder,
        variantFlipOrder: defaults.defaultVariantFlipOrder,
        container: document.documentElement.getBoundingClientRect(),
        forceApplyOnFailure: false,
        position: 'bottom-start',
        margin: 8
    };

    // Normalize arguments
    if (typeof reference === 'object' && !(reference instanceof HTMLElement)) {
        Object.assign(baseOptions, reference);
    } else {
        baseOptions.reference = reference;
        baseOptions.popper = popper;
        Object.assign(baseOptions, options);
    }

    return {
        update(options: Partial<NanoPopOptions> = baseOptions, _force?: boolean): string | null {
            const {
                container,
                reference,
                popper,
                margin,
                position,
                forceApplyOnFailure,
                variantFlipOrder,
                positionFlipOrder
            } = Object.assign(baseOptions, options);

            if (!popper || !reference) {
                throw new Error('[NanoPop] Popper or reference element missing.');
            }

            /**
             * Reset position to resolve viewport
             * See https://developer.mozilla.org/en-US/docs/Web/CSS/position#fixed
             */
            popper.style.left = '0';
            popper.style.top = '0';

            const refBox = reference.getBoundingClientRect();
            const popBox = popper.getBoundingClientRect();

            /**
             * Holds coordinates of top, left, bottom and right alignment
             */
            const positionStore: AvailablePositions = {
                t: refBox.top - popBox.height - margin,
                b: refBox.bottom + margin,
                r: refBox.right + margin,
                l: refBox.left - popBox.width - margin
            };

            /**
             * Holds corresponding variants (start, middle, end).
             * The values depend on horizontal / vertical orientation
             */
            const variantStore: AvailableVariants = {
                vm: (-popBox.width / 2) + (refBox.left + refBox.width / 2),
                vs: refBox.left,
                ve: refBox.left + refBox.width - popBox.width,
                hs: refBox.bottom - refBox.height,
                he: refBox.bottom - popBox.height,
                hm: refBox.bottom - refBox.height / 2 - popBox.height / 2
            };

            // Extract position and variant
            // Top-start -> top is "position" and "start" is the variant
            const [posKey, varKey = 'middle'] = position.split('-');
            const positions = positionFlipOrder[posKey as keyof PositionFlipOrder];
            const variants = variantFlipOrder[varKey as keyof VariantFlipOrder];

            // Try out all possible combinations, starting with the preferred one.
            const {top, left, bottom, right} = container;

            for (const p of positions) {
                const vertical = (p === 't' || p === 'b');

                // The position-value
                const positionVal = positionStore[p as keyof AvailablePositions];

                // Which property has to be changes.
                const [positionKey, variantKey] = (vertical ? ['top', 'left'] : ['left', 'top']) as PositionPairs;

                /**
                 * box refers to the size of the popper element. Depending on the orientation this is width or height.
                 * The limit is the corresponding, maximum value for this position.
                 */
                const [positionSize, variantSize] = vertical ? [popBox.height, popBox.width] : [popBox.width, popBox.height];
                const [positionMaximum, variantMaximum] = vertical ? [bottom, right] : [right, bottom];
                const [positionMinimum, variantMinimum] = vertical ? [top, left] : [left, top];

                // Skip pre-clipped values
                if (!_force && (positionVal < positionMinimum || (positionVal + positionSize) > positionMaximum)) {
                    continue;
                }

                for (const v of variants) {

                    // The position-value, the related size value of the popper and the limit
                    const variantVal = variantStore[((vertical ? 'v' : 'h') + v) as keyof AvailableVariants];

                    if (!_force && (variantVal < variantMinimum || (variantVal + variantSize) > variantMaximum)) {
                        continue;
                    }

                    // Apply styles and normalize viewport
                    popper.style[variantKey] = `${variantVal - popBox[variantKey]}px`;
                    popper.style[positionKey] = `${positionVal - popBox[positionKey]}px`;
                    return p + v;
                }
            }

            if (forceApplyOnFailure) {
                return this.update(undefined, true);
            }

            return null;
        }
    };
};
