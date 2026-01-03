
"use client";

import React, { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const passwordCriteria = [
  { id: 'length', text: 'At least 8 characters long', regex: /.{8,}/ },
  { id: 'uppercase', text: 'At least one uppercase letter', regex: /[A-Z]/ },
  { id: 'lowercase', text: 'At least one lowercase letter', regex: /[a-z]/ },
  { id: 'number', text: 'At least one number', regex: /[0-9]/ },
  { id: 'special', text: 'At least one special character', regex: /[^A-Za-z0-9]/ },
];

interface PasswordStrengthCheckerProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    [key: string]: any; // Allow other props to be passed down
}

const PasswordStrengthChecker = React.forwardRef<HTMLInputElement, PasswordStrengthCheckerProps>(
    ({ value, onChange, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { strengthScore, criteriaMet } = useMemo(() => {
        let score = 0;
        const met = passwordCriteria.map(criterion => {
        const isMet = criterion.regex.test(value);
        if (isMet) {
            score++;
        }
        return { ...criterion, met: isMet };
        });
        return { strengthScore: score, criteriaMet: met };
    }, [value]);

    const getStrengthColor = () => {
        if (strengthScore <= 2) return 'bg-red-500';
        if (strengthScore <= 4) return 'bg-orange-500';
        return 'bg-green-500';
    };

    const progressValue = (strengthScore / passwordCriteria.length) * 100;

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="w-full space-y-4">
        <div className="relative">
            <Input
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Enter your password"
            value={value}
            onChange={onChange}
            className="pr-10"
            ref={ref}
            {...props}
            />
            <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
            >
            {isPasswordVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
        </div>

        <div>
            <Progress value={progressValue} indicatorClassName={cn("transition-all duration-300", getStrengthColor())} className="h-2"/>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
            {criteriaMet.map((criterion) => (
                <div
                key={criterion.id}
                className={cn(
                    'flex items-center text-xs transition-colors',
                    criterion.met ? 'text-green-600' : 'text-muted-foreground'
                )}
                >
                {criterion.met ? (
                    <Check className="mr-2 h-4 w-4" />
                ) : (
                    <X className="mr-2 h-4 w-4" />
                )}
                <span>{criterion.text}</span>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
});

PasswordStrengthChecker.displayName = 'PasswordStrengthChecker';


export default PasswordStrengthChecker;
